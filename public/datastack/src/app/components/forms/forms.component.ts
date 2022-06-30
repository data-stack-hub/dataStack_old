import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  @Output() form_data: EventEmitter<any> = new EventEmitter()
  @Output() submit: EventEmitter<any> = new EventEmitter()
  public myForm: FormGroup = this.fb.group({});
  
  constructor(private fb: FormBuilder, 
    private appinit:AppinitService,
    private cf:ComponentsService) { 
  }


ngOnChanges(change:any){
    if (!change.state.firstChange){
      this.state = change.state.currentValue
    }
  }
  ngOnInit() {
    console.log(this.controls)
    this.createForm(this.controls)
  }

  createForm(controls) {
    for (const control of controls) {
      const validatorsToAdd = [];
      let key, value:any
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

      console.log(validatorsToAdd)
      this.myForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }
  onSubmit() {
    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
    // this.form_data.emit(this.myForm.value)
    // this.submit.emit(this.myForm.value)
    let event = this.cf.get_component('form').events.submit
    event.params.payload = this.myForm.value
    this.appinit.dispatch_event(event).subscribe(res=>{
      console.log(res)
    }, (error)=>{
      console.log('error :', error)
    })
  }
}
