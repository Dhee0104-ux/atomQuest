from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone

app = FastAPI(
    title="AquaMind Real Telemetry Ingestion API",
    description="FastAPI ingestion backend for connected purifier telemetry (ESP32 hardware bench node or IoT gateway).",
    version="1.0.0",
)

# Enable CORS for local dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TelemetryReading(BaseModel):
    device_id: str = Field(..., description="Unique device identifier (e.g. ESP32-HW-BENCH-01)")
    flow_rate_lpm: float = Field(..., ge=0.0, le=10.0, description="Instantaneous flow rate in Liters Per Minute")
    inlet_tds_ppm: float = Field(..., ge=0.0, le=5000.0, description="Raw feed water TDS in ppm / mg/L")
    outlet_tds_ppm: float = Field(..., ge=0.0, le=2000.0, description="Purified permeate TDS in ppm / mg/L")
    pressure_psi: float = Field(..., ge=0.0, le=200.0, description="Inlet or booster pressure in psi")
    turbidity_ntu: Optional[float] = Field(default=0.8, ge=0.0, le=50.0, description="Optical turbidity in NTU")
    timestamp: Optional[str] = Field(default=None, description="ISO-8601 UTC timestamp")

# In-memory storage for ingested telemetry packets
ingested_packets: List[dict] = []
registered_devices: dict = {}

@app.get("/")
def read_root():
    return {
        "service": "AquaMind Telemetry Gateway",
        "concept": "atomQUEST 2026 Round 2 Submission",
        "disclaimer": "Independent concept; not affiliated with or endorsed by Atomberg.",
        "status": "online",
        "endpoints": [
            "POST /api/readings",
            "GET /api/readings/latest",
            "GET /api/status",
            "GET /api/devices"
        ]
    }

@app.get("/api/status")
def get_status():
    has_live_bench = any(d.get("is_bench", False) for d in registered_devices.values())
    return {
        "status": "operational",
        "total_packets_received": len(ingested_packets),
        "live_bench_connected": has_live_bench,
        "active_devices_count": len(registered_devices),
        "server_time": datetime.now(timezone.utc).isoformat()
    }

@app.post("/api/readings", status_code=status.HTTP_201_CREATED)
def post_telemetry(reading: TelemetryReading):
    ts = reading.timestamp or datetime.now(timezone.utc).isoformat()
    
    # Calculate salt rejection
    rejection = 0.0
    if reading.inlet_tds_ppm > 0:
        rejection = round((1.0 - (reading.outlet_tds_ppm / reading.inlet_tds_ppm)) * 100, 1)
        rejection = max(0.0, min(100.0, rejection))
    
    packet_data = {
        "device_id": reading.device_id,
        "flow_rate_lpm": reading.flow_rate_lpm,
        "inlet_tds_ppm": reading.inlet_tds_ppm,
        "outlet_tds_ppm": reading.outlet_tds_ppm,
        "pressure_psi": reading.pressure_psi,
        "turbidity_ntu": reading.turbidity_ntu,
        "salt_rejection_percent": rejection,
        "timestamp": ts,
        "received_at": datetime.now(timezone.utc).isoformat()
    }
    
    ingested_packets.append(packet_data)
    if len(ingested_packets) > 500:
        ingested_packets.pop(0)
        
    registered_devices[reading.device_id] = {
        "device_id": reading.device_id,
        "last_seen": ts,
        "latest_telemetry": packet_data,
        "is_bench": True
    }
    
    return {
        "status": "accepted",
        "device_id": reading.device_id,
        "salt_rejection_percent": rejection,
        "acknowledged_at": ts
    }

@app.get("/api/readings/latest")
def get_latest_readings():
    if not ingested_packets:
        return {"readings": [], "message": "No telemetry received yet. All frontend data remains simulated."}
    return {
        "readings": ingested_packets[-20:],
        "count": len(ingested_packets)
    }

@app.get("/api/devices")
def get_devices():
    return {
        "devices": list(registered_devices.values()),
        "count": len(registered_devices)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
