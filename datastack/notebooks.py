from .db.sql import sql 
from .config import config
import requests

table = 'notebooks_new_t'
url = 'http://datastackhub-datastack-6rhr2oo42fe:8888/api/contents'
token = 'e915101bb22ee2c5da28147e2cabd42f12b80a5555e08ee5'
headers={
        'Authorization': f'Token {token}',
    }

path = '/data'
# b = requests.post(url+'/data', headers=headers, json={'type':'notebook'})
# print(b, b.json())   

def create_notebook(workspace, notebook_name):
    b = requests.post(url+path, headers=headers, json={'type':'notebook'})
    print(b, b.json())    
    data = {
        'path':path+'/'+notebook_name + '.ipynb'
    }
    a = requests.patch(url+'/'+b.json()['path'], headers=headers, json=data)
    print(a, a.json())
    if a.status_code == 200:
        db = sql(config['db_path'], table)
        db.add_document(a.json())
    else:
        if b.status_code == 201:
            print(b.json()['path'])
            c = requests.delete(url+'/'+b.json()['path'], headers=headers)
            print(c)


def get_all_notebooks(workplace):
    db = sql(config['db_path'], table)
    return db.get_all_documents()
