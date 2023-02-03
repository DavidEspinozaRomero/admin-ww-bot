import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  LayoutComponent,
  LoginComponent,
  RestorePasswordComponent,
  RegisterComponent,
  VerifyEmailComponent,
  ForgotPasswordComponent,
} from './pages';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'restore-password', component: RestorePasswordComponent },
      { path: 'verify-email', component: VerifyEmailComponent },
      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
