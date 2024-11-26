from flask import request

from ..app import app
from .controllers import list_all_buildings_controller, create_building_controller, retrieve_building_controller, update_building_controller, delete_building_controller

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