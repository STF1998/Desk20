import { LoginComponent } from './login/login.component';
import { APITestComponent } from './api-test/api-test.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingAnimComponent } from './loading-anim/loading-anim.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
