from flask import Flask
from app import app1 
from flask_cors import CORS
from fn import *


app = Flask(__name__)
cors = CORS(app)

@app.route("/")
def hello_world():
    return { 'data' :"<p>Hello, World!</p>"}

def get_fn(method_name):
    possibles = globals().copy()
    possibles.update(locals())
    method = possibles.get(method_name)
    return method

for route in app1['routes']:
    print(route, route['fn'])
    app.add_url_rule(route['path'], view_func=get_fn(route['fn']), methods = ["get","post"])

if __name__ == '__main__':
  app.run(debug=True)
