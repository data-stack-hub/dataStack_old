import { Component,  OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute  } from '@angular/router';
import {filter} from 'rxjs/operators';
import { AppinitService } from 'src/app/services/appinit.service';
import { ComponentsService } from 'src/app/services/components.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  current_route = ''
  component: any;
  
  constructor(private router : Router, 
    private route: ActivatedRoute,
    private cf : ComponentsService,
    private appinit : AppinitService
    ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
  )
      .subscribe((event:any) => {
          console.log(event.urlAfterRedirects);
        this.current_route = event.urlAfterRedirects
        console.log(this.cf.get_component(this.appinit.route_to_component(this.current_route)))
        this.component = this.cf.get_component(this.appinit.route_to_component(this.current_route))
        console.log(this.component)
      });

    
   }

  ngOnInit(): void {
   
  }


}
