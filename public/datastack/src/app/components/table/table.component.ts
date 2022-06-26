import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.get_data()
  }

  get_data(){
    this.loading = true
    this.api.get(this.url).subscribe((res:any)=>{
      let columns = [...new Set(res.flatMap(Object.keys))]
      this.columns = columns.map(x=>{ return {display_name:x, column_name:x}})
      this.dataSet = res
      this.loading = false
    })
  }

  row_click(){
    this.row_click_event.emit(true)
  }

}
