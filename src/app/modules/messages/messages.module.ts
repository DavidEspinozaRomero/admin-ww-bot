import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MessagesRoutingModule } from './messages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ModalqrcodeComponent } from './components/modalqrcode/modalqrcode.component';
import { MessagesComponent } from './pages/messages/messages.component';


@NgModule({
  declarations: [
    ModalqrcodeComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessagesRoutingModule,
    SharedModule
  ]
})
export class MessagesModule { }
