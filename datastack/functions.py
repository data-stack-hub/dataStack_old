import pandas as pandas
from .config import config
from .db.sql import sql 
import importlib
import importlib.util as imputil
import sys, inspect

table = 'functions'

def update_create_new_function(function_name, code, workspace='default'):
    print(function_name, code, workspace)
    try:
        check_function = get_function(workspace, function_name)
    except:
        check_function=[]
    print(check_function,type(check_function))
    if not check_function:
        fn = {
            'name':function_name,
            'code':code,
            'workspace':workspace
        }
        print(fn)
        db = sql(config['db_path'], table)
        db.add_document(fn)
    else:
        print('update', code)
        update_function(workspace, function_name, code)

def get_all_functions():
    db = sql(config['db_path'], table)
    return db.get_all_documents()

def get_function(workspace, function_name):
    db = sql(config['db_path'], table)
    return db.get_document("SELECT * from functions where name = '" + function_name + "'")

def update_function(workspace, function_name, data):
    db = sql(config['db_path'], table)
    return db.update_document(workspace, function_name, data)
    
def run_function(function_name):
    print('running function', function_name)
    function_doc = get_function('workspace', function_name)
    print(function_doc)
    fn = code_to_function(function_doc)
    print(inspect(fn))

def _module_to_namespace(namespace):
    # if isinstance(namespace, ModuleType):
        members = inspect.getmembers(
            namespace, lambda o: inspect.isfunction(o) or isinstance(o, type)
        )
        return {key: mod for key, mod in members}


def code_to_function(function_doc):
    code = function_doc[0]['code']
    name = function_doc[0]['name']

    spec = imputil.spec_from_loader('my_module', loader=None)
    my_module = importlib.util.module_from_spec(spec)
    exec(code, my_module.__dict__)
    sys.modules['my_module'] = my_module
    print(_module_to_namespace(my_module))
    namespace  = _module_to_namespace(my_module)
    if name in namespace:
        fn = namespace[name]
        return fn
    else:
        print('function not found')
