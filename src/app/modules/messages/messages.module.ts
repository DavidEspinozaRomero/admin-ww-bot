import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MessagesRoutingModule } from './messages-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ModalqrcodeComponent } from './components/modalqrcode/modalqrcode.component';


@NgModule({
  declarations: [
    HomeComponent,
    ModalqrcodeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessagesRoutingModule,
    SharedModule
  ]
})
export class MessagesModule { }
