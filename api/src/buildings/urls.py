from flask import request

from ..app import app
from .controllers import list_all_buildings_controller, create_building_controller, retrieve_building_controller, update_building_controller, delete_building_controller, create_sensor_controller, get_sensor_data

@app.route("/buildings", methods=['GET', 'POST'])
def list_create_buildings():
    if request.method == 'GET': return list_all_buildings_controller()
    if request.method == 'POST': return create_building_controller()
    else: return 'Method is Not Allowed'

@app.route("/buildings/<building_id>", methods=['GET', 'PUT', 'DELETE'])
def retrieve_update_destroy_buildings(building_id):
    if request.method == 'GET': return retrieve_building_controller(building_id)
    if request.method == 'PUT': return update_building_controller(building_id)
    if request.method == 'DELETE': return delete_building_controller(building_id)
    else: return 'Method is Not Allowed'

@app.route("/buildings/<string:building_id>/sensors", methods=['POST'])
def create_sensor(building_id):
    print(f"Creating sensor for building ID: {building_id}")
    return create_sensor_controller(building_id)

@app.route("/buildings/<string:building_id>/sensors", methods=['GET'])
def get_sensor(building_id):
    if request.method == 'GET': return get_sensor_data(building_id)
    else: return 'Method is Not Allowed'

