const data_app = {
    app_id: 'data_stack',
    routes: [
        {path:'/workspace/${workspace}', page:'workspace_home'},
        {path:'/workspace/${workspace}/function/${function}', page:'function_home'},
        {path:'/workspace/${workspace}/new_function', page:'new_function'},
        {path:'/workspace/${workspace}/functions', page:'function_list'},
        {path:'/workspace/${workspace}/edit_function/${function}', page:'new_function'},

        {path:'workspace/${workspace}/notebooks', page:'notebooks'},
        {path:'workspace/${workspace}/notebooks/notebook/new', page:'edit_notebook'},
        {path:'workspace/${workspace}/notebooks/${notebook_name}', page:'open_notebook'},

        {path:'workspace/${workspace}/etl', page:'etl'},
        {path:'workspace/${workspace}/airflow', page:'airflow'},

        {path:'/projects', component:'projects', page:'test_page'},
        {path:'/test', component:'test'},
        {path:'/todo', component:'todo'},
        {path:'/form', component:'form'},
        {path:'/new_workspace', component:'new_workspace'},
    ],

    menu :[
        {
            rank:1,
            name:'Workspace',
            link:'projects',
            icon:'bookmark-outline'
          },
          {
            name:'Functions',
            link:'workspace/${workspace}/functions'
          },
          {
            name:'Notebook',
            link:'workspace/${workspace}/notebooks'
          },
          {
            name:'ETL',
            link:'workspace/${workspace}/etl'
          },
          {
            name:'AirFlow',
            link:'workspace/${workspace}/airflow'
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
                link:'workspace/${workspace}/notebooks/notebook/new'
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
      ],
      notebooks:[
        {id:'notbook', type:'text', params:{data:'notebook works!'}},
        {id:'notebook_list', type:'table_component',
          params:{url:'${api_url}/workspace/${workspace}/notebooks'},
          events:{row_click_event:{type:'navigation', params:{path:'/workspace/${worspace}/notebooks/${name}'}, fn:'navigate_to'}}  
      }
      ],
      edit_notebook:[
        {id:'edit_notebook', type:'form',
          params:{
            controls:[{name:'notebook_name', label:'Notebook Name', type:'text', validators:{}}],
            submit_button_name:'create_notebook'
          },
          events:{
            submit:{
              type:'http', request:'post',
              params:{
                create_url:'${api_url}/workspace/${workspace}/new_notebook'
              },
              success:{type:'navigation',params:{ path:'/workspace/${workspace}/notebooks'}, fn:'navigate_to'},

              
            }
          }
      }
      ],
      open_notebook:[
        {id:'notebook_iframe', type:'iframe', params:{url:'${jupyter_url}/${notebook_name}'}}
      ],
      etl:[
        {id:'etl', type:'iframe', params:{url:'${airbyte_url}'}}
      ],
      airflow:[
        {id:'airflow', type:'iframe', params:{url:'${airflow_url}'}}
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
    variables: { 
      api_url:'https://3245-datastackhub-datastack-6rhr2oo42fe.ws-us54.gitpod.io/api',
      jupyter_url:'https://8888-datastackhub-datastack-6rhr2oo42fe.ws-us54.gitpod.io/notebooks/data',
      airbyte_url:'https://8000-datastackhub-datastack-6rhr2oo42fe.ws-us54.gitpod.io/',
      airflow_url:'https://8080-datastackhub-datastack-6rhr2oo42fe.ws-us54.gitpod.io/'

    },

    // data model
    models: {}
}


const enovix_app = {
  routes: [
    {path:'/tm0', page:'home'},
    {path:'/crypto', page:'crypto'},
  ],
  menu :[
    {
        rank:1,
        name:'TM0',
        link:'tm0',
        icon:'bookmark-outline'
      },
      {
        rank:1,
        name:'crypto',
        link:'crypto',
        icon:'bookmark-outline'
      }
    ],
  pages:{
    home:[
      {id:'workplace_header_U1', type:'chart', 
      params:{
        width:100, x_axis:'accumulationtime_min', y_axis:['voltage_mv', 'current_ma'], title:'1st formation VA', height:250, query:"select * from [Metrology].[dbo].[Z4T2RawData] where lot_id = 'E01000E0T' and stage = 'T2_TRACKING2'", database:'db21_rawdata',
        details:{}
      }},
      {id:'workplace_header', type:'chart', params:{width:50,x_axis:'accumulationtime_min', y_axis:['voltage_mv', 'current_ma'], title:'Low Cap Check', height:250, query:"select * from [Metrology].[dbo].[Z4T2RawData] where lot_id = 'E01000E0T' and stage = 'T2_LOWCAPCHK'", database:'db21_rawdata'}}
    ],
    crypto:[
      {id:'workplace_header123', type:'text', params:{data:'this is workplace home '}},
      {id:'workplace_header', type:'drawer', params:{
        components:[
          {id:'workplace_header123', type:'text', params:{data:'this is workplace home in side drawer1'}},
          {id:'workplace_header123', type:'text', params:{data:'this is workplace home in side drawer2'}},
          {id:'', type:'tabs', params:{
            tabs:[
              {title:'Query', component:[
                {id:'workplace_header123',  type:'code_editor', params:{componet_ref:''}},
                {id:'workplace_header123', type:'text', params:{data:'this is workplace home in side drawer2'}}
              ]},
              {title:'t2', component:[
                {id:'workplace_header123',  type:'text', params:{data:'this is workplace home in side tab1', }},
                {id:'workplace_header123', type:'text', params:{data:'this is workplace home in side drawer2'}}
              ]}
            ]
          } }
        ]
        }
      },
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
            params:{url:'${api_url}/index',
            create_url:'${api_url}run_fn',
            update_url:'${api_url}/workspace/${workspace}/function/${function}',
            create_request_type : 'PUT',
            update_request_type:'POST',
          }
        },
        }
      }
      ],

    
  },
  variables: { 'api_url':'http://localhost:5000/'}

}
export const app = enovix_app
