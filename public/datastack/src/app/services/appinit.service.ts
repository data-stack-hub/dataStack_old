import { Injectable, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { app } from './app'

@Injectable({
  providedIn: 'root'
})
export class AppinitService {

  _app:any = app
  constructor(private router: Router,
    private api: ApiService
    ) {
    console.log(app)

   }

   navigate_to(params:any){
    console.log(params)
    console.log(params.path)
    this.router.navigateByUrl(params.path)
   }

   route_to_component(route:any){
    return this._app.routes.filter((it:any)=>it.path == route)[0].component
   }

   get_app_content(){
    return this._app
   }

   dispatch_event(_event:any){
    console.log('event:', _event)
    if(_event.type == 'http'){
      if (_event.request == 'post'){
        return this.api.post(_event.params.url, _event.params.payload)
      }else{
        return this.api.get(_event.params.url)
      }
    }
    else if(_event.hasOwnProperty('fn')){
      return this[_event.fn](_event.params)
    }
   }

  
}
