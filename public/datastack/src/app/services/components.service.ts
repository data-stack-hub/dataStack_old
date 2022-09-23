import { Injectable } from '@angular/core';
import { ChartComponent } from '../components/chart/chart.component';
import { CodeEditorComponent } from '../components/code-editor/code-editor.component';
import { DrawerComponent } from '../components/drawer/drawer.component';
import { FormsComponent } from '../components/forms/forms.component';
import { IframeComponent } from '../components/iframe/iframe.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { TableComponent } from '../components/table/table.component';
import { TabsComponent } from '../components/tabs/tabs.component';
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
    'code_editor':CodeEditorComponent,
    'iframe':IframeComponent,
    'chart':ChartComponent,
    'drawer':DrawerComponent,
    'tabs':TabsComponent
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
      comp.page_id = page_name
    });
    return _page
  }

  get_component_class(component_type){
    return this.mapping[component_type]
  }
}
