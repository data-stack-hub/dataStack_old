export const app = {
    app_id: 'data_stack',
    routes: [
        {path:'/workspace/${workspace}', page:'workspace_home'},
        {path:'/workspace/${workspace}/function/${function}', page:'function_home'},
        {path:'/workspace/${workspace}/new_function', page:'new_function'},
        {path:'/workspace/${workspace}/functions', page:'function_list'},
        {path:'/workspace/${workspace}/edit_function/${function}', page:'new_function'},

        {path:'/projects', component:'projects', page:'test_page'},
        {path:'/test', component:'test'},
        {path:'/todo', component:'todo'},
        {path:'/form', component:'form'},
        {path:'/new_workspace', component:'new_workspace'},
    ],

    menu :[
        {
            rank:1,
            name:'workspace',
            link:'projects',
            icon:'bookmark-outline'
          },
          {
            name:'functions',
            link:'workspace/${workspace}/functions'
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
                link:'workspace/${workspace}/new_workspace',
                events:{'click':{type:'http', params:{url:'https://3245-datastackhub-datastack-6rhr2oo42fe.ws-us47.gitpod.io/api/create_workspace'}}}
              },
              {
                name:'function',
                link:'workspace/${workspace}/new_function'
              },
              {
                name:'notebook',
                
              }
            ]
          }
    ],

    //  view for UI

    pages:{
      workspace_home:[
        {id:'workplace_header', type:'text', params:{data:'this is workplace home - ${workspace}'}}
      ],
      function_home:[
        {id:'function_home', type:'text', params:{data:'this is function ghome - ${function}'}}
      ],
      new_function:[
        // {id:'code_editor', type:'code_editor'},
        {id:'new_function', type:'text', params:{data:'create new function'}},
        {id:'new_function_form', type:'form', 
          params:{
            data_load_url:'${api_url}/workspace/${workspace}/function/${function}',
            controls : [
            {
              "name": "function_name",
              "label": "Function Name",
              "value": "",
              "type": "text",
              "validators": {
                "required": true,
              }
            },
            {
              "name":'code',
              "lable":'code',
              "type":'code',
              "validators":{
                "required":false
              }
            }
          ]
        },
        events:{
          'submit':{
            type:'http',request:'post', 
            success:{type:'navigation',params:{ path:'/workspace/${workspace}/functions'}, fn:'navigate_to'},
            error:{},
            params:{url:'${api_url}/workspace/${workspace}/function/${function}',
            create_url:'${api_url}/workspace/${workspace}/new_function',
            update_url:'${api_url}/workspace/${workspace}/function/${function}',
            create_request_type : 'PUT',
            update_request_type:'POST',
      

          }
        },
          
        }

      }
      ],
      function_list:[
        {id:'function_list', type:'table_component',
          params:{url:'${api_url}/workspace/${workspace}/functions'},
          events:{'row_click_event':{type:'navigation', params:{path:'/workspace/${worspace}/edit_function/${name}?edit=true'}, fn:'navigate_to'}}
        }
      ]
      
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
              params:{
                create_url:'${api_url}/workspace/${workspace}/new_function',
                update_url:'${api_url}/workspace/${workspace}/functions/${function_name}'},
                create_request_type : 'PUT',
                update_request_type:'POST',
          },
            
          }
        }

    },
    variables: { api_url:'https://3245-datastackhub-datastack-6rhr2oo42fe.ws-us53.gitpod.io/api'},

    // data model
    models: {}
}