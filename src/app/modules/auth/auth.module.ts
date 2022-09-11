import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth.routing';
import {
  LayoutComponent,
  LoginComponent,
  RestorePasswordComponent,
  RegisterComponent,
} from './pages';

@NgModule({
  declarations: [
    LoginComponent,
    RestorePasswordComponent,
    RegisterComponent,
    LayoutComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
