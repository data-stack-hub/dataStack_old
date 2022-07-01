import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AppinitService } from 'src/app/services/appinit.service';
import { ComponentsService } from 'src/app/services/components.service';
import { ComponentDirective } from './component.directive';

@Component({
  selector: 'app-component-loader',
  templateUrl: './component-loader.component.html',
  styleUrls: ['./component-loader.component.css']
})
export class ComponentLoaderComponent implements OnInit {
  @ViewChild(ComponentDirective, {static: true}) root!: ComponentDirective;  

  @Input() component ={}
  constructor(private appinit : AppinitService) { }

  ngOnChanges(change:any){
    console.log(change.component)
    if (!change.component.firstChange){
      this.component = change.component.currentValue
      // console.log(this.component)
      this.loadComponent()
    }
  }
  ngOnInit(): void {
    this.loadComponent();
    // console.log(this.current_route)
  }

  loadComponent() {
    const viewContainerRef = this.root.viewContainerRef;
    console.log(this.root, ComponentDirective, viewContainerRef  )

    viewContainerRef.clear();
      let _component:any = this.component
      console.log(_component)
      const componentRef:any = viewContainerRef.createComponent(_component.type);
      componentRef.instance.events = _component.events
      Object.keys(_component.parameters || {}).forEach((key:any)=>{
        componentRef.instance[key] = _component.parameters[key]
      })
      Object.keys(_component.events || {}).forEach((key:any)=>{
        console.log(key)
        componentRef.instance[key].subscribe((a)=>{
          console.log('event clicked',a)
          _component.events[key].params.payload = a
          this.appinit.dispatch_event(_component.events[key]).subscribe(res=>{
            console.log(res)
            componentRef.instance.state = 'success'
          })
        })
        
      })  
  
  
  }

}
