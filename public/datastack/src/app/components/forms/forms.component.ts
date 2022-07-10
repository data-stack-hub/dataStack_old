import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AppinitService } from 'src/app/services/appinit.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  @Input() controls:any = []
  @Input() state:any
  @Input() events:any
  @Input() edit:any = false
  @Input() data_load_url:any
  @Input() submit_button_name:any = 'submit'

  @Output() form_data: EventEmitter<any> = new EventEmitter()
  @Output() submit: EventEmitter<any> = new EventEmitter()

  public myForm: FormGroup = this.fb.group({});
  
  constructor(private fb: FormBuilder, 
    private appinit:AppinitService,
    private api:ApiService,
    private cf:ComponentsService) { 
  }


ngOnChanges(change:any){
    if (!change.state.firstChange){
      this.state = change.state.currentValue
    }
  }
  ngOnInit() {
    console.log(this.controls)
    console.log(this.events)
    this.createForm(this.controls)
    this.appinit.get_query_params().subscribe((queryParams:any)=>{
      // console.log(res)
      this.edit = queryParams.edit
      console.log('loading for form with edit = ', this.edit)
      if (queryParams.edit){
        this.get_data()
      }
    })
  }

  createForm(controls) {
    for (const control of controls) {
      const validatorsToAdd = [];
      let key, value:any
      if(control.hasOwnProperty('validators')){
      for ([key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }
    }

      console.log(control, validatorsToAdd)
      this.myForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
      console.log(this.myForm)
      // this.myForm.patchValue({'function_name':'test', 'code':'test'})
    }
  }


  get_data(){
    console.log('api', this.data_load_url)
    this.appinit.dispatch_event({type:'http', params:{url:this.data_load_url} }).subscribe(res=>{
      console.log(res)
      res[0].function_name= res[0].name
      console.log(res)
      this.myForm.patchValue(res[0])
    })
  
  }
  onSubmit() {
    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
    // this.form_data.emit(this.myForm.value)
    // this.submit.emit(this.myForm.value)
    let event = this.events.submit
    event.params.payload = this.myForm.value
    if(this.edit){
      event.params.url = event.params.update_url
    }
    else{
      event.params.url = event.params.create_url
    }
    
    this.appinit.dispatch_event(event).subscribe(res=>{
      console.log(res)
      let success_event = this.events.submit.success
      success_event.params.payload = res
      this.appinit.dispatch_event(success_event)
    }, (error)=>{
      console.log('error :', error)
      this.appinit.dispatch_event(this.events.submit.error)
    })
  }

  code_change(control_name, ev){
    let a = {}
    a[control_name] = ev
    this.myForm.patchValue(a);
  }
}
