from sqlalchemy import create_engine
import pandas as pd
import os, json
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
parent = os.path.dirname(SCRIPT_DIR)
data_directory = os.path.join(parent, 'data')

path = os.path.relpath(data_directory , os.getcwd())
local_db = 'sqlite:///'+path+'/data_stack.db'

postgres = 'postgresql://eaepxfmiotjjvq:b4deb8f830ec5d15df319e69701a25716a0972b1178276654a4b898d6dbd82e1@ec2-54-87-179-4.compute-1.amazonaws.com:5432/d7jj3fcspm1kp'
class sql():
    def __init__(self, connection, table):
        
        self.engine = create_engine(postgres)
        self.table = table

    def add_document(self, data):
        pd.json_normalize(data).to_sql(self.table, self.engine, if_exists='append')

    def get_all_documents(self):
        return pd.read_sql_query('SELECT * FROM '+ self.table, self.engine).to_json(orient="records")
    
    def get_document(self, query):
        return json.loads(pd.read_sql_query(query, self.engine).to_json(orient="records"))
    
    def update_document(self, workspace, function_name, data):
        try:
            pd.read_sql_query("UPDATE functions set code=' "+data+" ' where name='"+function_name+"'", self.engine)
        except:
            pass