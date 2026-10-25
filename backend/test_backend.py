from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert "Atomberg" in data["disclaimer"]

def test_api_status():
    response = client.get("/api/status")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "operational"

def test_post_valid_telemetry():
    payload = {
        "device_id": "ESP32-HW-BENCH-01",
        "flow_rate_lpm": 1.45,
        "inlet_tds_ppm": 600.0,
        "outlet_tds_ppm": 36.0,
        "pressure_psi": 78.5,
        "turbidity_ntu": 1.2
    }
    response = client.post("/api/readings", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["status"] == "accepted"
    assert data["device_id"] == "ESP32-HW-BENCH-01"
    # Salt rejection: (1 - 36/600)*100 = 94.0%
    assert data["salt_rejection_percent"] == 94.0

def test_get_latest_readings():
    response = client.get("/api/readings/latest")
    assert response.status_code == 200
    data = response.json()
    assert len(data["readings"]) > 0

def test_get_devices():
    response = client.get("/api/devices")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] >= 1
    assert data["devices"][0]["device_id"] == "ESP32-HW-BENCH-01"

def test_invalid_telemetry_range():
    # Negative flow rate should fail schema validation (422)
    invalid_payload = {
        "device_id": "ESP32-HW-BENCH-01",
        "flow_rate_lpm": -2.0,
        "inlet_tds_ppm": 600.0,
        "outlet_tds_ppm": 36.0,
        "pressure_psi": 78.5
    }
    response = client.post("/api/readings", json=invalid_payload)
    assert response.status_code == 422
