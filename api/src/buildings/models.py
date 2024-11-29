from sqlalchemy import inspect
from datetime import datetime, timezone
from flask_validator import ValidateEmail, ValidateString, ValidateCountry
from sqlalchemy.orm import validates
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
import pytz

from .. import db # from __init__.py

#Building Model
class Building(db.Model):
# Auto Generated Fields:
    __tablename__='buildings'
    id           = db.Column(db.String(50), primary_key=True, nullable=False, unique=True)
    created      = db.Column(db.DateTime(timezone=True), default=datetime.now)                           # The Date of the Instance Creation => Created one Time when Instantiation
    updated      = db.Column(db.DateTime(timezone=True), default=datetime.now, onupdate=datetime.now)    # The Date of the Instance Update => Changed with Every Update

# Input by User Fields:
    building_id  = db.Column(db.String(100), nullable=False, unique=True)
    name         = db.Column(db.String(100), unique=True)

    sensors = relationship("Sensor", back_populates="building", cascade="all, delete-orphan")

# How to serialize SqlAlchemy PostgreSQL Query to JSON => https://stackoverflow.com/a/46180522
    def toDict(self):
        return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }

#Sensor Reading Model
class Sensor(db.Model):
    __tablename__ = 'sensor'
    id = db.Column(db.String(50), primary_key=True, nullable=False, unique=True)
    building_id = db.Column(db.String(50), db.ForeignKey('buildings.building_id'), nullable=False)  # Correct foreign key reference
    temperature = db.Column(db.Float, nullable=False)
    pressure = db.Column(db.Float, nullable=False)
    humidity = db.Column(db.Float, nullable=False)
    airflow = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.now(pytz.utc))

    building = db.relationship("Building", back_populates="sensors")
