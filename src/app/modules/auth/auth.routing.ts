import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  LayoutComponent,
  LoginComponent,
  RestorePasswordComponent,
  RegisterComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'restore-password', component: RestorePasswordComponent },
      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
