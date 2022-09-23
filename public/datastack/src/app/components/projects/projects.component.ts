import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppinitService } from 'src/app/services/appinit.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TableComponent } from '../table/table.component';
import { ComponentLoaderComponent } from '../component-loader/component-loader.component';
import { ComponentsService } from 'src/app/services/components.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {


workspace
  component 
  constructor(private appinit: AppinitService, 
    private modal: NzModalService,
    private  viewContainerRef: ViewContainerRef,
    private cf : ComponentsService,
    private route: ActivatedRoute) { }



  ngOnInit(): void {
    // console.log(this.route.snapshot.url[1].path)
    this.workspace = 'this.route.snapshot.url[1].path'
    this.component = this.cf.get_component('form')
  }

  open_popup(){
    this.test_popup()
  }

  test_popup(){

 
    this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: ComponentLoaderComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzClosable: false,
      nzComponentParams : {component:this.component},
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });
   }
}
