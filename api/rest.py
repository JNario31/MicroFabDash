import random
from flask import Flask, request,jsonify
from flask_cors import CORS
from datetime import datetime
from collections import deque
from flask_sqlalchemy import SQLAlchemy
import time

app=Flask(__name__)
CORS(app)

def generate_temp_data():
    temperature = round(random.uniform(19, 22), 2)
    return {"temp": temperature}

def generate_humid_data():
    humidity = round(random.uniform(19, 22), 2)
    return {"humid": humidity}

@app.route("/api/data", methods=["GET"])
def get_data():
    data_type = request.args.get('type')
    if data_type == 'temp':
        return jsonify(generate_temp_data())
    elif data_type == 'humid':
        return jsonify(generate_humid_data())
    else:
        return jsonify({"error": "Invalid type. Use 'temp' or 'humid'."}), 404

if __name__ == '__main__':
    app.run(debug=True)