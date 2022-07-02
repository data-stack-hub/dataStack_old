export const app = {
    app_id: 'data_stack',
    routes: [
        {path:'/projects', component:'projects', page:'test'},
        {path:'/test', component:'test'},
        {path:'/todo', component:'todo'},
        {path:'/form', component:'form'},
        {path:'/new_workspace', component:'new_workspace'},
        {path:'/workspace/${workspace}/function/${function}', component:'test'},
        {path:'/new_workspace/${workspace}', component:'test'}
    ],

    menu :[
        {
            rank:1,
            name:'workspace',
            link:'projects',
            icon:'bookmark-outline'
          },
          {
            name:'form',
            link:'form'
          },
          
          {
            rank:1,
            name:'test',
            link:'test',
            icon:'bookmark-outline'
          },
          {
            rank:1,
            name:'todo',
            link:'todo',
            icon:'bookmark-outline'
          },
          {
            name:'create',
            icon:'plus-circle',
            children:[
              {
                name:'workspace',
                link:'new_workspace',
                events:{'click':{type:'http', params:{url:'https://3245-datastackhub-datastack-6rhr2oo42fe.ws-us47.gitpod.io/api/create_workspace'}}}
              },
              {
                name:'function',
                link:'new_function'
              },
              {
                name:'notebook',
                
              }
            ]
          }
    ],

    //  view for UI

    pages:{
      test:{
        id: 'project_component',
        type:'project_component'
    }
    },
    components: {
        projects:{
            type : 'table_component',
            id:'projects',
            parameters : {url:'https://3245-datastackhub-datastack-6rhr2oo42fe.ws-us47.gitpod.io/api/workspaces'},
            events :{ 'row_click_event':{type:'navigation', params:{ path:'/test'},fn:'navigate_to'}}
          },
        test:{
            id: 'project_component',
            type:'project_component'
        },
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
            'submit':{type:'http', params:{url:'https://ockbin.org/bin/7a932332-95c3-4617-b067-318ad9a9539a?foo=bar&foo=baz'}}
          }
        },
        todo:{
            id : 'table_component',
            type:'table_component',
            parameters : {url:'https://jsonplaceholder.typicode.com/todos'},
            events :{ 'row_click_event':{type:'navigation', to:'/test',params:{ path:'/test'}, fn:'navigate_to'}}
          },
        new_workspace:{
          id:'new_worspace',
          type:'form',
          parameters:{controls : [
            {
              "name": "name",
              "label": "Name:",
              "value": "",
              "type": "text",
              "validators": {
                "required": true,
              }
            },
          ]},
          events:{
            'submit':{
              type:'http',request:'post', 
              success:{type:'navigation',params:{ path:'/workspace/${name}'}, fn:'navigate_to'},
              error:{},
              params:{url:'https://3245-datastackhub-datastack-6rhr2oo42fe.ws-us47.gitpod.io/api/create_workspace'}
          },
            
          }
        },
        new_function:{
          id:'new_worspace',
          type:'form',
          parameters:{controls : [
            {
              "name": "name",
              "label": "Name:",
              "value": "",
              "type": "text",
              "validators": {
                "required": true,
              }
            },
          ]},
          events:{
            'submit':{
              type:'http',request:'get', 
              success:{type:'navigation',params:{ path:'/workspace/${workspace}/function/${new_function}'}, fn:'navigate_to'},
              error:{},
              params:{url:'${api_url}/workspace/${workspace}/new_function'}
          },
            
          }
        }

    },
    variables: { api_url:'https://3245-datastackhub-datastack-6rhr2oo42fe.ws-us47.gitpod.io/api'},

    // data model
    models: {}
}