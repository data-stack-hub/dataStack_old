import { Component } from '@angular/core';
import { AppinitService } from './services/appinit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'datastack';
  constructor(private appinit: AppinitService){

  }
}
