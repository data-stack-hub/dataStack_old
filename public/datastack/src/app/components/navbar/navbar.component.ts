import { Component, OnInit } from '@angular/core';
import { AppinitService } from 'src/app/services/appinit.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls:['./navbar.component.css']

})
export class NavbarComponent implements OnInit {
menu = []
  constructor(private appinit : AppinitService) {
    
      this.menu = this.appinit.get_app_content()['menu']
    
   }

  ngOnInit(): void {
    
  }

  nav_to(link){
    this.appinit.dispatch_event({fn:'navigate_to', params:{path:link}})
  }
}
