import { Component, Input, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { AppinitService } from 'src/app/services/appinit.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css']
})
export class IframeComponent implements OnInit {

  @Input() url
  show_frame = false
  constructor(private sanitizer:DomSanitizer, private appinit:AppinitService) { }

  ngOnInit(): void {
    this.url = this.appinit.replace_variable(this.url)
    this.show_frame = true
  }


  sanitized_url(){
    let url = 'https://8888-datastackhub-datastack-6rhr2oo42fe.ws-us53.gitpod.io/notebooks/data/Untitled.ipynb'
    console.log(this.url)
    return  this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
