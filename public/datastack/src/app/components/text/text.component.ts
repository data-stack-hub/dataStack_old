import { Component, Input, OnInit } from '@angular/core';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  @Input() data:any
  display_data:any
  constructor(private variables:VariablesService) { }

  ngOnInit(): void {
    this.display_data = this.variables.replace_variable(this.data)
    console.log()
  }

}
