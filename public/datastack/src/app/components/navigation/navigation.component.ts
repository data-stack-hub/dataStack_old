import { Component,  OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import {filter} from 'rxjs/operators';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  
  
  constructor(private router : Router, 
    ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
  )
      .subscribe(event => {
          console.log(event);

      });
   }

  ngOnInit(): void {
   
  }


}
