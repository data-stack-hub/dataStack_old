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
import { ComponentDirective } from './components/component-loader/component.directive';
import { ComponentLoaderComponent } from './components/component-loader/component-loader.component';
import { TableComponent } from './components/table/table.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NavbarComponent,
    ProjectsComponent,
    ComponentDirective,
    ComponentLoaderComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    antdModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons },  { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
