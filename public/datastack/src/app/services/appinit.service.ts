import { Injectable, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { ApiService } from './api.service';
import { app } from './app'
import { VariablesService } from './variables.service';

@Injectable({
  providedIn: 'root'
})
export class AppinitService {

  _app:any = app
  constructor(private router: Router,
    private api: ApiService,
    private variables:VariablesService
    ) {
    console.log(app)
      this.variables.set_app_variables(this._app.variables)
   }

   navigate_to(params:any){
    console.log(params)
    console.log(params.path)
    let path = this.variables.replace_variable(params.path, params.payload)
    this.router.navigateByUrl(path)
   }

   route_to_component(route:any){
    console.log(this._app.routes)
    console.log(route.split('/').filter(e =>  e))
    let route_array = route.split('/').filter(e =>  e)
    let filtered_route:any = ''
    try {
      if (route_array.length == 1){
        filtered_route =  this._app.routes.filter((it:any)=>it.path == route)
      }else{
        let route = this._app.routes.filter((it:any)=>it.path.includes(route_array[0]) && it.path.split('/').filter(e=>e).length == route_array.length)
        console.log(route)
        route.forEach(element => {
          let path_array = element.path.split('/').filter(e=>e)
          console.log(path_array)
          path_array.forEach((p, i) => {
            if(p.includes('${')){
              path_array[i] = route_array[i]
            }
          });
          console.log(path_array)
          if(path_array == route_array ){
            filtered_route =  element
          }
        });
        filtered_route =  route
      }

      if( filtered_route[0].hasOwnProperty('page')){
        return filtered_route[0].page
      }else{
        return filtered_route[0].component
      }
  
    } catch (error) {
      return route_array[0]
    }
    
   }

   get_app_content(){
    return this._app
   }

   dispatch_event(_event:any){
    console.log('event:', _event)
    if(_event.type == 'http'){
      let url = this.variables.replace_variable(_event.params.url)
      if (_event.request == 'post'){
        return this.api.post(url, _event.params.payload)
      }else{
        return this.api.get(url)
      }
    }
    else if(_event.hasOwnProperty('fn')){
      return this[_event.fn](_event.params)
    }
   }

  
}
