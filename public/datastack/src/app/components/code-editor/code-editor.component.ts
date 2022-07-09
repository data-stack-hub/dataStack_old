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

  @Input() code:any = ''
  @Output() code_change = new EventEmitter<any>()
  aceEditor:any
  onChange: any = () => { };
  onTouched: any = () => {};

  @ViewChild("editor",{
    static: false
  }) private editor: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setValue(this.code);
    // aceEditor.setTheme('ace/theme/Clouds');
    this.aceEditor.session.setMode('ace/mode/python');
    this.aceEditor.on("change", () => {
      // console.log(aceEditor.getValue());
      // this.code_change.emit(this.aceEditor.getValue())
      this.onChange(this.aceEditor.getValue());
    });
  }


  writeValue(value): void {
    // this.value = value;
    // this.aceEditor.session.setValue(value)
    console.log(this.aceEditor, value)
    if (this.aceEditor && value){
      console.log('setiign value')
      this.code  = value
      this.aceEditor.session.setValue(value)
      this.onChange('abc')
    }
    
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
}
