import { Injectable, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { ApiService } from './api.service';
import { app } from './app'
import { VariablesService } from './variables.service';

@Injectable({
  providedIn: 'root'
})
export class AppinitService {


  _app:any = app
  _app$ = new BehaviorSubject({});
  constructor(private router: Router,
    private api: ApiService,
    private variables:VariablesService,
    private route: ActivatedRoute
    ) {
    console.log(app)
      this.variables.init_app_variables(this._app.variables)
      this.store_app_local()
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
        filtered_route =  this._app.routes.filter((it:any)=>it.path == route)[0]
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
          console.log(path_array, route_array)
          let match_path =  (path_array.length == route_array.length) && path_array.every(function(element, index) {
            return element === route_array[index]; 
        });
        console.log(match_path)
          if(match_path ){
            console.log(element)
            filtered_route =  element
          }
        });
        // filtered_route =  route
      }
      console.log(filtered_route,route)
      filtered_route.path.split(/[?#]/)[0].split('/').filter(e=>e).forEach((element, i) => {
        if(element.includes('${')){
          this.variables.set_app_variables(element.replace('${','').replace('}',''), route.split(/[?#]/)[0].split('/').filter(e=>e)[i])
        }
      });
      if( filtered_route.hasOwnProperty('page')){
        console.log(filtered_route)

        return {page_name:filtered_route.page}
      }else{
        return filtered_route.component
      }
  
    } catch (error) {
      return route_array
    }
    
   }

   get_app_content(){
    return this._app
   }

   store_app_local(){
    console.log('storing app to local storage')
    localStorage.setItem('app', JSON.stringify(this._app));
   }

   replace_variable(target, scope?){
    return this.variables.replace_variable(target, scope)
   }

   dispatch_event(_event:any){
    console.log('event:', _event)
    if(_event.type == 'http'){
      let url = this.variables.replace_variable(_event.params.url)
      console.log('url',url)
      if (_event.request == 'post'){
        console.log(_event)
        return this.api.post(url, _event.params.payload)
      }else{
        return this.api.get(url, _event.params.payload)
      }
    }
    else if(_event.hasOwnProperty('fn')){
      return this[_event.fn](_event.params)
    }
   }

  get_query_params(){
    return this.route.queryParams
  }


  update_component(params:any){
    console.log('updating component', params.payload.page_id, params.payload)
    let component = this._app.pages[params.payload.page_id].filter(_component=>_component.id == "workplace_header_U1" )[0]
    console.log(component)
    component.params = params.payload.params
    console.log(this._app)
    this._app$.next(this._app)
  }
}
