from flask import Flask, jsonify
from flask_cors import CORS
from pathlib import Path
import os, sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
parent = os.path.dirname(SCRIPT_DIR)
sys.path.append(os.path.dirname(parent))

print(sys.path)
import datastack

app = Flask(__name__)
cors = CORS(app)

@app.route("/")
def hello_world():
    response = jsonify({'some': 'data'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/create_workspace')
def create_workspace():
    print('creating workspace')
    return datastack.workplaces.create_workspace()

@app.route('/api/workspaces')
def get_workspace():
    return datastack.workplaces.get_workspaces()

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=3245, debug=True)
