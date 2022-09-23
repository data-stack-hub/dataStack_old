import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Input() props:any ={tabs:[]}
  constructor() { }

  ngOnInit(): void {
    console.log(this.props.tabs)
  }

}
