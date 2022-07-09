from flask import Flask, jsonify
from flask import request
from flask_cors import CORS
from pathlib import Path
import os, sys, json

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

@app.route('/api/create_workspace',  methods = ['GET', 'POST', 'DELETE'])
def create_workspace():
    worskspace_name = request.json['name']
    try:
        datastack.workplaces.create_workspace(worskspace_name)
        return jsonify({'name':worskspace_name})
    except Exception as e:
        print('error',e)
        return 'error', 400

@app.route('/api/workspace/<workspace>/new_function', methods = ['GET', 'POST', 'DELETE'])
def create_function(workspace):
    function_name = request.json['function_name']
    code = request.json['code']
    print(workspace,function_name, code)
    datastack.functions.update_create_new_function(function_name, code, workspace)
    return jsonify({'function_name':function_name})

@app.route('/api/workspace/<workspace>/function/<function_name>', methods=['GET', 'POST'])
def _function(workspace, function_name):
    print(workspace, function_name)
    if request.method == 'GET':
        return jsonify(datastack.functions.get_function(workspace, function_name))
    elif request.method == 'POST':
        code = request.json['code']
        datastack.functions.update_create_new_function(function_name, code, workspace)
        return jsonify({'function_name':function_name})

@app.route('/api/workspace/<workspace>/functions')
def get_all_functions(workspace):
    return datastack.functions.get_all_functions()

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=3245, debug=True)
