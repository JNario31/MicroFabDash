from flask import request, jsonify
import uuid

from .. import db
from .models import Building

# ----------------------------------------------- #

# Query Object Methods => https://docs.sqlalchemy.org/en/14/orm/query.html#sqlalchemy.orm.Query
# Session Object Methods => https://docs.sqlalchemy.org/en/14/orm/session_api.html#sqlalchemy.orm.Session
# How to serialize SqlAlchemy PostgreSQL Query to JSON => https://stackoverflow.com/a/46180522

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