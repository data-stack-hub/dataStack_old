Medium article about [# dataStack
](https://medium.com/@vishalvora_53246/no-code-app-development-with-python-sql-and-angular-dea8e9aad7a3)

## run front end:
```
cd public\datastack
npm install --force
npm run start or ng serve
```
go to localhost:4200 

for changing UI change app description in app.ts file (public\datastack\src\app\services\app.ts

## run backend
```
cd datastack_v1
python install -r requirements.txt
python api.py
```

## example:
### text input
```
    {
      "name": "name",
      "label": "Name:",
      "value": "",
      "type": "text",
      "validators": {
        "required": true,
      }
    },
```

### forms
```
        form:{
          id:'form',
          type:'form',
          parameters:{controls : [
            {
              "name": "firstName",
              "label": "First name:",
              "value": "",
              "type": "text",
              "validators": {
                "required": true,
              }
            },
            {
              "name": "firstName last",
              "label": "First name last:",
              "value": "",
              "type": "text_area",
              "validators": {}
            }
          ]},
          events:{
            'submit':{type:'http', params:{url:'https://my_api_url.com'}}
          }
        },

```

### TODO

- [x] Create dynamic ui from json description file
- [x] add actions and events from UI
- [ ] python custom functions
- [ ] modify json description form browser

