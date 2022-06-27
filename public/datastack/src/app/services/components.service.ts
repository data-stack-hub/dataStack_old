import { Injectable } from '@angular/core';
import { ProjectsComponent } from '../components/projects/projects.component';
import { TableComponent } from '../components/table/table.component';
import { app } from './app'
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  mapping:any={
    'table_component':TableComponent,
    'project_component':ProjectsComponent
  }
  constructor(private utils:UtilsService) { }

  get_component(component_name:string){
    console.log(app)
    console.log(component_name)
    let _app:any = app
    let _component:any = this.utils.deep_copy(_app.components[component_name]) 
    console.log(_component)
    _component.id = this.mapping[_component.id]
    return _component
  }
}
