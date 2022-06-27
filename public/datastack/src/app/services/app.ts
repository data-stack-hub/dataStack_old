export const app = {
    app_id: 'data_stack',
    routes: [
        {path:'/projects', component:'projects'},
        {path:'/test', component:'test'},
        {path:'/todo', component:'todo'},
    ],

    nav_links :[
        {
            rank:1,
            name:'projects',
            link:'projects',
            icon:'bookmark-outline'
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
    ],

    //  view for UI
    components: {
        projects:{
            id : 'table_component',
            parameters : {url:'https://jsonplaceholder.typicode.com/posts'},
            events :{ 'row_click_event':{type:'navigation', to:'/test'}}
          },
        test:{
            id: 'project_component'
        },
        todo:{
            id : 'table_component',
            parameters : {url:'https://jsonplaceholder.typicode.com/todos'},
            events :{ 'row_click_event':{type:'navigation', to:'/test'}}
          },
    },
    variables: {},

    // data model
    models: {}
}