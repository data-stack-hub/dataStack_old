import { Component, OnInit } from '@angular/core';
import { AppinitService } from 'src/app/services/appinit.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls:['./navbar.component.css']

})
export class NavbarComponent implements OnInit {
nav_links = []
  constructor(private appinit : AppinitService) {
    
      this.nav_links = this.appinit.get_app_content()['nav_links']
      console.log(this.nav_links)
    
   }

  ngOnInit(): void {
    
  }

  nav_to(link){
    this.appinit.navigate_to(link)
  }
}
