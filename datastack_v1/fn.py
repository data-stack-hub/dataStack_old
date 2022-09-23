# functions list
from flask import request
from sql import *
from run_fn import *


def test():
    pass
def query():
    # print(request.json['query'])
    query = request.args.to_dict()['query']
    database = request.args.to_dict()['database']
    return get_data(database, query)

def run_custom_fn():
    function_name = request.json['function_name']
    code = request.json['code']
    return run_fn(function_name,code)
