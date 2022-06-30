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

  nav_to(menu){
    // console.log(a)
    if( menu.hasOwnProperty('link'))
    this.appinit.dispatch_event({fn:'navigate_to', params:{path:menu.link}})
    else if(menu.hasOwnProperty('events')){
      this.appinit.dispatch_event(menu.events.click).subscribe(res=>{
        console.log(res)
      })
    }
  }
  
}
