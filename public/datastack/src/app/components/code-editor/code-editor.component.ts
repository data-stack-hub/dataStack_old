import { Component, ElementRef, Input,Output, OnInit, ViewChild, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as ace from "ace-builds";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeEditorComponent),
      multi: true
    }
  ]
})
export class CodeEditorComponent implements OnInit, ControlValueAccessor {

  // @Input() code:any = ''
  // @Input() lang:any='python'
  @Input() props:any = {}
  @Output() code_change = new EventEmitter<any>()
  aceEditor:any
  onChange: any = () => { };
  onTouched: any = () => {};

  @ViewChild("editor",{
    static: false
  }) private editor: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
    console.log(this.props.code)
  }

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    
    // aceEditor.setTheme('ace/theme/Clouds');
    this.aceEditor.session.setMode('ace/mode/'+this.props.lang || 'python');
    this.aceEditor.session.setUseWrapMode(true);
    this.aceEditor.session.setValue(this.props.code || '');
    this.aceEditor.on("change", () => {
      console.log(this.aceEditor.getValue());
      // this.code_change.emit(this.aceEditor.getValue())
      this.onChange(this.aceEditor.getValue());
    });
  }


  writeValue(value): void {
    console.log(this.aceEditor, value)
    // if (this.aceEditor && value){
    //   console.log('setiign value')
    //   this.props.code  = value
    //   this.aceEditor.session.setValue(value)
    //   this.onChange('abc')
    // }
    
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // this.disabled = isDisabled;
  }

  click_event(){
    console.log('code save clicked')
    this.code_change.emit(JSON.parse(this.aceEditor.getValue()))
  }
}
