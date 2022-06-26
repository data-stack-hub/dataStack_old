import { Component,  OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute  } from '@angular/router';
import {filter} from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  current_route = ''
  
  constructor(private router : Router, 
    private route: ActivatedRoute
    ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
  )
      .subscribe((event:any) => {
          console.log(event.urlAfterRedirects);
        this.current_route = event.urlAfterRedirects
      });

    
   }

  ngOnInit(): void {
   
  }


}
