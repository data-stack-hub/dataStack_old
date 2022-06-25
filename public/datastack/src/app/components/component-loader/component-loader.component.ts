import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsComponent } from '../projects/projects.component';
import { AdDirective } from './component.directive';

@Component({
  selector: 'app-component-loader',
  templateUrl: './component-loader.component.html',
  styleUrls: ['./component-loader.component.css']
})
export class ComponentLoaderComponent implements OnInit {
  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;  

  constructor() { }

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    console.log(this.adHost, AdDirective  )
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(ProjectsComponent);
  }

}
