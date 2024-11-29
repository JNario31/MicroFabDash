import requests
import random
import time
from datetime import datetime, timezone
import pytz

BASE_URL = "http://127.0.0.1:5000"
BUILDING_ID = "1"  # Replace with your building_id

# Define the timezone using pytz
LOCAL_TIMEZONE = pytz.timezone('America/Toronto')


# Function to generate random sensor data
def generate_sensor_data():
    utc_time = datetime.now(pytz.utc)
    
    # Convert UTC time to local time
    local_time = utc_time.astimezone(LOCAL_TIMEZONE)
    print("Generated Timestamp:", local_time.isoformat())  # Debugging
    return {
        "temperature": round(random.uniform(10.0, 30.0), 2),  # Random temperature between 10 and 40
        "pressure": round(random.uniform(900.0, 1100.0), 2),  # Random pressure between 900 and 1100 hPa
        "humidity": round(random.uniform(20.0, 100.0), 2),     # Random humidity between 0% and 100%
        "airflow": round(random.uniform(0.5, 3.0), 2),        # Random airflow between 0.5 and 3.0 m/s
        "timestamp": local_time.isoformat()              # Current timestamp in ISO format
    }

# Infinite loop to send data every second
while True:
    sensor_data = generate_sensor_data()
    try:
        # POST request to the Flask API
        response = requests.post(
            f"{BASE_URL}/buildings/{BUILDING_ID}/sensors",
            json=sensor_data,  # Send data as JSON
            headers={"Content-Type": "application/json"}
        )
        if response.status_code == 201:
            print(f"Sensor data posted successfully: {sensor_data}")
        else:
            print(f"Failed to post data: {response.status_code}, {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Error sending request: {e}")
    
    # Wait 1 second before sending the next data
    time.sleep(1)
