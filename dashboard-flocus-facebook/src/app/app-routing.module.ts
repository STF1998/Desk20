import { AsaquaComponent } from './asaqua/asaqua.component';
import { LoginComponent } from './login/login.component';

import { APITestComponent } from './api-test/api-test.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {StudyComponent} from './study/study.component'
import {LeagueComponent} from './league/league.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'league', component: LeagueComponent },
  { path: 'study', component: StudyComponent },
  { path: 'home', component: HomeComponent},
  { path: 'asaqua', component: AsaquaComponent},
  { path: '**', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
