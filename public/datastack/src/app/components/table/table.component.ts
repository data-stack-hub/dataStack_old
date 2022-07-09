import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  dataSet:any = []
  columns:any = []
  loading = false
  @Input() url:any
  @Output() row_click_event = new EventEmitter<any>()
  constructor(private api: ApiService, private vars : VariablesService) { }

  ngOnInit(): void {
    console.log(this.url)
    this.get_data()
  }

  get_data(){
    this.loading = true
    this.api.get(this.vars.replace_variable(this.url)).subscribe((res:any)=>{
      console.log(res)
      let columns = [...new Set(res.flatMap(Object.keys))]
      this.columns = columns.map(x=>{ return {display_name:x, column_name:x}})
      this.dataSet = res
      this.loading = false
    })
  }

  row_click(data){
    this.row_click_event.emit(data)
  }

}
