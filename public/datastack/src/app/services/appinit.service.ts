import { Injectable, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { app } from './app'

@Injectable({
  providedIn: 'root'
})
export class AppinitService {

  _app:any = app
  constructor(private router: Router,
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
    this[_event.fn](_event.params)
   }

  
}
