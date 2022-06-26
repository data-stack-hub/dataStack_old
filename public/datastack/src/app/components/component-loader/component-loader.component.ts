import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { AppinitService } from 'src/app/services/appinit.service';
import { ComponentsService } from 'src/app/services/components.service';
import { AdDirective } from './component.directive';

@Component({
  selector: 'app-component-loader',
  templateUrl: './component-loader.component.html',
  styleUrls: ['./component-loader.component.css']
})
export class ComponentLoaderComponent implements OnInit {
  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;  

  @Input() current_route =''
  constructor(private appinit : AppinitService,
    private cf: ComponentsService) { }

  ngOnChanges(change:any){
    console.log(change.current_route)
    if (!change.current_route.firstChange){
      this.current_route = change.current_route.currentValue
      console.log(this.current_route)
      this.loadComponent()
    }
  }
  ngOnInit(): void {
    this.loadComponent();
    console.log(this.current_route)
  }

  loadComponent() {
    console.log(this.adHost, AdDirective  )
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
      let _component:any = this.cf.get_component(this.appinit.route_to_component(this.current_route))
      console.log(_component)
      const componentRef:any = viewContainerRef.createComponent(_component.component);
      Object.keys(_component.paramaters || {}).forEach((key:any)=>{
        componentRef.instance[key] = _component.paramaters[key]
        
      })
      Object.keys(_component.events || {}).forEach((key:any)=>{
        console.log(key)
        componentRef.instance[key].subscribe(()=>{
          console.log('event clicked')
          this.appinit.actions(_component.events[key])
        })
        
      })  
  
  
  }

}
