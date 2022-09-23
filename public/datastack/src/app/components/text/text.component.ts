import { Component, Input, OnInit } from '@angular/core';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  @Input() props:any
  display_data:any
  constructor(private variables:VariablesService) { }

  ngOnInit(): void {
    console.log(this.props.data)
    this.display_data = this.variables.replace_variable(this.props.data)
    console.log()
  }

}
