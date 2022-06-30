import pandas as pandas
from .config import config
from .db.sql import sql 


table = 'workspaces'

def create_workspace():
    data = {'name':'default_workspace'}
    db = sql(config['db_path'], table)
    db.add_document(data)
    # return db.get_all_documents()

def get_workspaces():
    db = sql(config['db_path'], table)
    return db.get_all_documents()
