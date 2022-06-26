import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { app } from './app'
@Injectable({
  providedIn: 'root'
})
export class AppinitService {

  _app:any = app
  constructor(private router: Router) {
    console.log(app)

   }

   navigate_to(path:any){
    this.router.navigateByUrl(path)
   }

   route_to_component(route:any){
    return this._app.routes.filter((it:any)=>it.path == route)[0].component
   }

   get_app_content(){
    return this._app
   }

   actions(_action:any){
    console.log(_action)
    if (_action.type == 'navigation'){
      this.navigate_to(_action.to)
    }
   }
}
