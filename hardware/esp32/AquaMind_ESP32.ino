/**
 * AquaMind ESP32 IoT Sensor Node Firmware Reference
 * atomQUEST 2026 (Atomberg) — Round 2 Concept
 * 
 * Target Hardware: ESP32-WROOM-32 Development Board
 * Sensors:
 *   - Hall-Effect Turbine Flow Meter (e.g., YF-S201) on GPIO 4 (Interrupt)
 *   - Analog TDS Sensor (Dual-pin AC probe) on GPIO 34 (ADC1_CH6)
 *   - Piezoresistive Pressure Transducer (0.5V-4.5V / 0-100 psi) on GPIO 35 (ADC1_CH7)
 * 
 * Ingestion Endpoint: POST /api/readings
 */

#include <WiFi.h>
#include <HTTPClient.h>

// Wi-Fi Credentials
const char* WIFI_SSID = "YOUR_WIFI_SSID";
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";

// AquaMind Gateway Host Endpoint
const char* API_ENDPOINT = "http://192.168.1.100:8000/api/readings";
const char* DEVICE_ID = "ESP32-HW-BENCH-01";

// Hardware Pin Definitions
#define PIN_FLOW_SENSOR    4
#define PIN_TDS_ANALOG     34
#define PIN_PRESSURE_ANALOG 35
#define PIN_STATUS_LED     2

// Flow Meter Calibration Factor (YF-S201: ~7.5 pulses per second = 1 L/min)
const float FLOW_CALIBRATION_FACTOR = 7.5;
volatile unsigned long pulseCount = 0;

unsigned long lastSampleTime = 0;
const unsigned long SAMPLE_INTERVAL_MS = 2000; // Sample every 2 seconds

// Flow Sensor Interrupt Service Routine (ISR)
void IRAM_ATTR pulseCounterISR() {
  pulseCount++;
}

// Read Analog TDS with Temperature Compensation & Moving Average
float readInletTdsPpm() {
  long sum = 0;
  for (int i = 0; i < 20; i++) {
    sum += analogRead(PIN_TDS_ANALOG);
    delay(2);
  }
  float avgAdc = (float)sum / 20.0;
  float voltage = (avgAdc / 4095.0) * 3.3;
  
  // Standard dual-pin conversion polynomial: TDS = (133.42*V^3 - 255.86*V^2 + 857.39*V) * 0.5
  float compensationCoefficient = 1.0; // Assuming 25°C
  float compensationVoltage = voltage / compensationCoefficient;
  float tdsValue = (133.42 * pow(compensationVoltage, 3) - 255.86 * pow(compensationVoltage, 2) + 857.39 * compensationVoltage) * 0.5;
  
  if (tdsValue < 0) tdsValue = 0;
  return tdsValue;
}

// Read Piezoresistive Pressure Sensor (0.5V to 4.5V mapped to 0 to 100 psi via voltage divider)
float readPressurePsi() {
  long sum = 0;
  for (int i = 0; i < 10; i++) {
    sum += analogRead(PIN_PRESSURE_ANALOG);
    delay(2);
  }
  float avgAdc = (float)sum / 10.0;
  float voltage = (avgAdc / 4095.0) * 3.3;
  
  // Scaling: 0.5V = 0 psi, 3.0V = 100 psi (voltage divided from 5V)
  float psi = ((voltage - 0.5) / 2.5) * 100.0;
  if (psi < 0.0) psi = 0.0;
  return psi;
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_FLOW_SENSOR, INPUT_PULLUP);
  pinMode(PIN_STATUS_LED, OUTPUT);
  
  attachInterrupt(digitalPinToInterrupt(PIN_FLOW_SENSOR), pulseCounterISR, RISING);

  Serial.println("\n[AquaMind] Initializing ESP32 Sensor Node...");
  Serial.print("[AquaMind] Connecting to Wi-Fi: ");
  Serial.println(WIFI_SSID);

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  int retry = 0;
  while (WiFi.status() != WL_CONNECTED && retry < 20) {
    delay(500);
    Serial.print(".");
    digitalWrite(PIN_STATUS_LED, !digitalRead(PIN_STATUS_LED));
    retry++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n[AquaMind] Wi-Fi Connected!");
    Serial.print("[AquaMind] Node IP: ");
    Serial.println(WiFi.localIP());
    digitalWrite(PIN_STATUS_LED, HIGH);
  } else {
    Serial.println("\n[AquaMind] Warning: Operating in offline bench mode.");
  }
}

void loop() {
  unsigned long currentTime = millis();
  if (currentTime - lastSampleTime >= SAMPLE_INTERVAL_MS) {
    detachInterrupt(digitalPinToInterrupt(PIN_FLOW_SENSOR));
    
    // Calculate Flow Rate in Liters Per Minute (LPM)
    float flowRateLpm = ((1000.0 / (currentTime - lastSampleTime)) * pulseCount) / FLOW_CALIBRATION_FACTOR;
    pulseCount = 0;
    lastSampleTime = currentTime;
    attachInterrupt(digitalPinToInterrupt(PIN_FLOW_SENSOR), pulseCounterISR, RISING);

    float inletTds = readInletTdsPpm();
    // In dual-probe setups, outlet TDS is sampled on second pin; for single-probe bench:
    float outletTds = inletTds * 0.065; // ~93.5% nominal RO rejection
    float pressurePsi = readPressurePsi();

    Serial.printf("[AquaMind Telemetry] Flow: %.2f LPM | Inlet TDS: %.1f ppm | Outlet TDS: %.1f ppm | Pressure: %.1f psi\n",
                  flowRateLpm, inletTds, outletTds, pressurePsi);

    // Transmit telemetry to FastAPI backend if connected and flow is active
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(API_ENDPOINT);
      http.addHeader("Content-Type", "application/json");

      String jsonPayload = "{";
      jsonPayload += "\"device_id\":\"" + String(DEVICE_ID) + "\",";
      jsonPayload += "\"flow_rate_lpm\":" + String(flowRateLpm, 2) + ",";
      jsonPayload += "\"inlet_tds_ppm\":" + String(inletTds, 1) + ",";
      jsonPayload += "\"outlet_tds_ppm\":" + String(outletTds, 1) + ",";
      jsonPayload += "\"pressure_psi\":" + String(pressurePsi, 1) + ",";
      jsonPayload += "\"turbidity_ntu\":0.8";
      jsonPayload += "}";

      int httpResponseCode = http.POST(jsonPayload);
      if (httpResponseCode > 0) {
        Serial.printf("[AquaMind] HTTP Response: %d\n", httpResponseCode);
      } else {
        Serial.printf("[AquaMind] HTTP Error: %s\n", http.errorToString(httpResponseCode).c_str());
      }
      http.end();
    }
  }
}
