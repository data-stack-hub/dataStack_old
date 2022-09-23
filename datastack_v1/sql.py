import pandas as pd
from sqlalchemy import create_engine
import pyodbc
def get_data(databse, query):
    cnxn = pyodbc.connect(driver='{ODBC Driver 17 for SQL Server}', server='db21', database='Metrology',               
               trusted_connection='yes')
    data  = pd.read_sql_query(query, cnxn)
    return data.to_json(orient="columns")