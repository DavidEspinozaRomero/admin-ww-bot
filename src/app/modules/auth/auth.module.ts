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
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

@NgModule({
  declarations: [
    LoginComponent,
    RestorePasswordComponent,
    RegisterComponent,
    LayoutComponent,
    VerifyEmailComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
