import { Injectable } from '@angular/core';
import { CodeEditorComponent } from '../components/code-editor/code-editor.component';
import { FormsComponent } from '../components/forms/forms.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { TableComponent } from '../components/table/table.component';
import { TextComponent } from '../components/text/text.component';
import { app } from './app'
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  mapping:any={
    'table_component':TableComponent,
    'project_component':ProjectsComponent,
    'form': FormsComponent,
    'text':TextComponent,
    'code_editor':CodeEditorComponent
  }
  constructor(private utils:UtilsService) { }

  get_component(component_name:string){
    console.log(app)
    console.log(component_name)
    let _app:any = app
    let _component:any = this.utils.deep_copy(_app.components[component_name]) 
    console.log(_component)
    _component.type = this.mapping[_component.type]
    return _component
  }

  get_page(page_name){
    let _app:any = app
    console.log(_app[page_name])
    let _page:any = this.utils.deep_copy(_app.pages[page_name]) 
    _page.forEach(comp => {
      comp.type = this.mapping[comp.type]
    });
    return _page

  }
}
