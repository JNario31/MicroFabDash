from flask import request, jsonify
import uuid

from .. import db
from .models import Building, Sensor
from datetime import datetime, timezone
import pytz

#Local Timezone
def get_local_timezone():
    return pytz.timezone('America/Toronto')

"""
Lists all buildings in table
"""
def list_all_buildings_controller():
    buildings = Building.query.all()
    response = []
    for building in buildings: response.append(building.toDict())
    return jsonify(response)

"""
Creates Building row
"""
def create_building_controller():
    request_form = request.form.to_dict()

    id = str(uuid.uuid4())
    new_building = Building(
                          id = id,
                          building_id    = request_form['building_id'],
                          name           = request_form['name'],
                          )
    db.session.add(new_building)
    db.session.commit()

    response = Building.query.get(id).toDict()
    return jsonify(response)


"""
Queries row with building id
"""
def retrieve_building_controller(building_id):
    response = Building.query.get(building_id).toDict()
    return jsonify(response)

"""
Updates row
"""
def update_building_controller(building_id):
    request_form = request.form.to_dict()
    building = Building.query.get(building_id)

    building.building_id = request_form['building_id']
    buidling.name        = request_form['name']
    db.session.commit()

    response = Building.query.get(building_id).toDict()
    return jsonify(response)

"""
Deletes row
"""
def delete_building_controller(building_id):
    Building.query.filter_by(id=building_id).delete()
    db.session.commit()

    return ('Building with Id "{}" deleted successfully!').format(building_id)

#___________________________________Sensor Controllers__________________________________________

def create_sensor_controller(building_id):
    building_id=str(building_id)

    request_data=request.json

    print(f"Building ID received: {building_id}")
    building = Building.query.filter_by(building_id=building_id).first()
    print(f"Building found: {building}")
    if not building:
        return jsonify({"error": "Building not found"}), 404
    
    id = str(uuid.uuid4())
    new_sensor = Sensor(
        id = id,
        building_id=building_id,
        temperature=request_data['temperature'],
        pressure=request_data['pressure'],
        humidity=request_data['humidity'],
        airflow=request_data['airflow'],
    )

    db.session.add(new_sensor)
    db.session.commit()

    return jsonify({"sensor": new_sensor.id, "building": building_id}), 201

def get_sensor_data(building_id):
    # Query the database for the sensor data based on building_id
    sensors = Sensor.query.filter_by(building_id=building_id).all()

    # Prepare the data to be returned as a JSON response
    sensor_data = [
        {
            'id': sensor.id,
            'building_id': sensor.building_id,
            'temperature': sensor.temperature,
            'pressure': sensor.pressure,
            'humidity': sensor.humidity,
            'airflow': sensor.airflow,
            'timestamp': sensor.timestamp.isoformat()  # Convert datetime to string
        }
        for sensor in sensors
    ]

    # Return the sensor data as a JSON response
    return jsonify(sensor_data)