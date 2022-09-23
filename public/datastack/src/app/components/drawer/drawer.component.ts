import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NzDrawerRef, NzDrawerService  } from 'ng-zorro-antd/drawer';
import { ComponentsService } from 'src/app/services/components.service';
import { ComponentLoaderComponent } from '../component-loader/component-loader.component';
import { TextComponent } from '../text/text.component';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {


  @Input() component:any={}
  @Input() components:any=[]
  @Input() hide_button:boolean=true
  @Input() visible:boolean = false
  @Output() on_close = new EventEmitter<any>()
  constructor(private drawerService:NzDrawerService) { }

  ngOnInit(): void {
    console.log(this.components)
  }

  openComponent(): void {
    const drawerRef = this.drawerService.create<ComponentLoaderComponent, { component: any }, string>({
      nzTitle: 'Component',
      nzFooter: 'Footer',
      nzExtra: 'Extra',
      nzContent: ComponentLoaderComponent,
      nzContentParams: {
        component:this.component
      }
    });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.on_close.emit()
  }
}
