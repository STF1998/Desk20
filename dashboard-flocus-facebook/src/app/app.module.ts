import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingAnimComponent } from './loading-anim/loading-anim.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import {ChartsModule} from 'ng2-charts';

import { APITestComponent } from './api-test/api-test.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { StudyComponent } from './study/study.component';
import { LeagueComponent } from './league/league.component';
import { AsaquaComponent } from './asaqua/asaqua.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingAnimComponent,
    LoginComponent,
    NavBarComponent,
    APITestComponent,
    HomeComponent,
    StudyComponent,
    LeagueComponent,
    AsaquaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
