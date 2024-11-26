from buildings.models import Building
from sensors.models import Sensor
from app import app
from . import db
import uuid

with app.app_context():
    # Add buildings
    building1 = Building(
        id=str(uuid.uuid4()), 
        building_id="B001", 
        name="Bergeron Building"
    )
    building2 = Building(
        id=str(uuid.uuid4()), 
        building_id="B002", 
        name="Petrie Building - Lab 1"
    )
    building3 = Building(
        id=str(uuid.uuid4()), 
        building_id="B003", 
        name="Petrie Building - Lab 2"
    )
    db.session.add_all([building1, building2, building3])
    db.session.commit()  # Commit to get IDs for the buildings

    # Add sensors
    sensor1 = Sensor(
        id=str(uuid.uuid4()), 
        building_id=building1.id, 
        temperature=23.5, 
        humidity=50, 
        pressure=1012, 
        airflow=1.3
    )
    sensor2 = Sensor(
        id=str(uuid.uuid4()), 
        building_id=building2.id, 
        temperature=22.0, 
        humidity=45, 
        pressure=1015, 
        airflow=1.5
    )
    sensor3 = Sensor(
        id=str(uuid.uuid4()), 
        building_id=building3.id, 
        temperature=24.0, 
        humidity=55, 
        pressure=1010, 
        airflow=1.2
    )
    db.session.add_all([sensor1, sensor2, sensor3])

    # Commit changes
    db.session.commit()
    print("Buildings and sensors seeded successfully!")
