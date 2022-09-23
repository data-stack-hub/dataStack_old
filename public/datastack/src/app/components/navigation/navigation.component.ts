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
  page:any
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
        let _page = this.appinit.route_to_component(this.current_route)
        // console.log('page_name',page_name)
        this.page = this.cf.get_page(_page.page_name)
        console.log('page', this.page)
        // console.log(this.appinit.route_to_component(this.current_route))

        // console.log(this.cf.get_component(this.appinit.route_to_component(this.current_route)))
        // console.log('loading component')
        // this.component = this.cf.get_component(this.appinit.route_to_component(this.current_route))
        // console.log(this.component)
      });

        this.appinit._app$.subscribe(update=>{
          console.log(this.router.url)
          let _page = this.appinit.route_to_component(this.router.url)
          this.page = this.cf.get_page(_page.page_name)
        })
    
   }

  ngOnInit(): void {
   
  }


}
