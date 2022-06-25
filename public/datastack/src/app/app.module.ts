import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// import { NzButtonModule } from 'ng-zorro-antd/button';
// import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { antdModule} from './dependency/antd.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition, IconService } from '@ant-design/icons-angular';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { ProjectsComponent } from './components/projects/projects.component';
import { AdDirective } from './components/component-loader/component.directive';
import { ComponentLoaderComponent } from './components/component-loader/component-loader.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NavbarComponent,
    ProjectsComponent,
    AdDirective,
    ComponentLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // NzButtonModule,
    // NzLayoutModule,
    antdModule,
    // NzIconModule.forRoot(icons),
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }
