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
    console.log(this.root, ComponentDirective  )
    const viewContainerRef = this.root.viewContainerRef;
    viewContainerRef.clear();
      let _component:any = this.component
      console.log(_component)
      const componentRef:any = viewContainerRef.createComponent(_component.id);
      Object.keys(_component.parameters || {}).forEach((key:any)=>{
        componentRef.instance[key] = _component.parameters[key]
        
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
