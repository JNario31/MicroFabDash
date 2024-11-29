import os
import psycopg2
from flask_cors import CORS

# App Initialization
from . import create_app # from __init__ file
app = create_app(os.getenv("CONFIG_MODE"))
CORS(app)
from .buildings import urls

# Hello World!
@app.route('/')
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run(debug=True)

