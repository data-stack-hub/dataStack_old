from sqlalchemy import create_engine
import pandas as pd
import os
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
parent = os.path.dirname(SCRIPT_DIR)
data_directory = os.path.join(parent, 'data')

class sql():
    def __init__(self, connection, table):
        path = os.path.relpath(data_directory , os.getcwd())
        self.engine = create_engine('sqlite:///'+path+'/data_stack.db')
        self.table = table

    def add_document(self, data):
        pd.json_normalize(data).to_sql(self.table, self.engine, if_exists='append')

    def get_all_documents(self):
        return pd.read_sql_query('SELECT * FROM '+ self.table, self.engine).to_json(orient="records")