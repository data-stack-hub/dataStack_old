import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AppinitService } from 'src/app/services/appinit.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  // @Input() query :any
  // @Input() database :any =''
  // @Input() height:any=400
  // @Input() width:any = 70
  // @Input() title:any
  // @Input() x_axis:any
  // @Input() y_axis:[]
  // @Input() raw_component:any={}
  @Input() props:any={}
  @Input() component:any = {}
  @Input() id:any=''
  details_visiblity = false
  show_detai_icon = false
  show_chart = false
  loading = false
  data:any
  public graph = {
    data: [
        { y: [], type: 'line', mode: 'lines+points', marker: {color: 'red'}, line:{width:1} },
        {  y: [],  yaxis: 'y2',type: 'line', mode: 'lines+points', marker: {color: 'green'}, line:{width:1} }
    ],
    layout: { height: this.props.height, legend: {"orientation": "h", "itemsizing":'constant'},yaxis2: {
        overlaying: 'y',
      side: 'right',
      tickfont:{
        size:12,
        color:'#24292F'
      }
    },
    // font_family:"Roboto",
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 25,
      pad: 4
    },
    autosize:true
  },
  
};

components:any = []

  constructor(private appinit : AppinitService) { 
    this.appinit._app$.subscribe(update=>{
      console.log(update)
      this.ngOnInit()
    })
    
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      console.log(changes,propName)
      // if( changes.hasOwnProperty('x') && !changes['x'].isFirstChange()){
      //   this.ngZone.run(()=>{
      //     this.x = changes['x']['currentValue']
      //   })
      //   console.log(this.x)
      //   this.update_data()
      // }
    }
  }

  ngOnInit(): void {
    console.log('new', this.props, this.id)
    this.graph.layout.height = this.props.height
    // this.graph.layout['width'] =  this.width
    this.load_details_design()
    this.get_data()
    
  }

  get_data(){
    this.loading = true
    this.appinit.dispatch_event({type:'http', request:"get", params:{url:'${api_url}/query' , payload:{'query':this.props.query, 'database':this.props.database}} }).subscribe(res=>{
      this.data = res
      console.log(this.data)
      this.loading = false
      this.show_chart = true
      this.graph.data[0]['x'] = Object.values(res[this.props.x_axis])
      this.graph.data[1]['x'] = Object.values(res[this.props.x_axis])
      this.props.y_axis.forEach((element, i )=> {
        this.graph.data[i]['y'] = Object.values(res[element])
        this.graph.data[i]['name'] = element
      });

      // console.log(this.graph)
    })
  }

  open_detail(){
    this.load_details_design()
    this.details_visiblity = true
  }
  on_details_close(){
    this.details_visiblity= false
  }

  mouseEnter(s){
    this.show_detai_icon = true
  }

  mouseLeave(s){
   this.show_detai_icon = false
  }

  load_details_design(){
    this.components =[
      {id:'workplace_header123', type:'text', params:{data:'this is workplace home in side drawer1'}},
      {id:'workplace_header123', type:'text', params:{data:'this is workplace home in side drawer2'}},
      {id:'', type:'tabs', params:{
        tabs:[
          {title:'Query', component:[
            {id:'workplace_header123',  type:'code_editor', params:{code:this.props.query}},
          ]},
          {title:'Component', component:[
            {id:'workplace_header123',  type:'code_editor', 
            params:{code:JSON.stringify(this.component,  null, '\t'), lang:'json' },
            events :{ 'code_change':{'params':{},  fn:'update_component'}}
          },
          ]},
          {title:'Data', component:[
            {id:'workplace_header123',  type:'table_component', params:{ url:'${api_url}/query' , payload:{'query':this.props.query, 'database':this.props.database}}},
          ]}

        ]
      } }
    ]
    
  }
}
