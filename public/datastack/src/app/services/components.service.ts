import { Injectable } from '@angular/core';
import { ProjectsComponent } from '../components/projects/projects.component';
import { TableComponent } from '../components/table/table.component';
import { app } from './app'
@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  mapping:any={
    'table_component':TableComponent,
    'project_component':ProjectsComponent
  }
  constructor() { }

  get_component(component_name:string){
    console.log(app)
    console.log(component_name)
    let _app:any = app
    let _component = _app.components[component_name]
    console.log(_component)
    return {
      component:this.mapping[_component.component],
      paramaters : _component.paramaters,
      events :_component.events
  }

    // if (component_name == '/projects'){
    //   return {
    //     component : app.components.TableComponent,
    //     paramaters : app.components.TableComponent.paramaters,
    //     events :app.components.TableComponent.events
    //   }
    // }
    // else{
    //   return {
    //     component: ProjectsComponent
    //   }
    // }
  }
}
