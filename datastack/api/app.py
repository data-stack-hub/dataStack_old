from flask import Flask, jsonify
from flask import request, send_from_directory, render_template
from flask_cors import CORS
from pathlib import Path
import os, sys, json

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
parent = os.path.dirname(SCRIPT_DIR)
root_dir = os.path.dirname(parent)
file_path = os.path.join(root_dir,'public/datastack/dist/datastack')
print('file path', file_path)
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
print('script dir', SCRIPT_DIR)

parent = os.path.dirname(SCRIPT_DIR)
sys.path.append(os.path.dirname(parent))
sys.path.append(os.path.dirname(os.path.dirname(parent)))
sys.path.append('.')
sys.path.append('..')
ROOT_DIR = os.path.abspath(os.curdir)
print('Root dir', ROOT_DIR)
os.chdir('../..')
print('current working directory', os.getcwd())
print(sys.path)
dir_list = os.listdir(os.getcwd())
print('all files', dir_list)
import app as datastack


app = Flask(__name__, static_folder=file_path, template_folder=file_path, static_url_path='/')
cors = CORS(app)

@app.route("/")
def hello_world():
    response = jsonify({'some': 'data'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/app")
def app_():
    return send_from_directory(file_path, "index.html")
    # return render_template( 'index.html')

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

#-------------------------- notebooks ---------------------------------------
@app.route('/api/workspace/<workspace>/new_notebook', methods=['GET', 'POST'])
def new_notebook(workspace):
    notebook_name = request.json['notebook_name']
    print(notebook_name)
    datastack.notebooks.create_notebook(workspace, notebook_name)
    return jsonify({'some':'value'})

@app.route('/api/workspace/<workspace>/notebooks')
def notebooks(workspace):
    return datastack.notebooks.get_all_notebooks(workspace)


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=3245, debug=True)
