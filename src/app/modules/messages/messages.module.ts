import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MessagesRoutingModule } from './messages.routing';

import { ModalqrcodeComponent } from './components/modalqrcode/modalqrcode.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { DirectivesModule } from '../shared';
import {
  InProgressModule,
  LoadingModule,
  RetryModule,
} from '../shared/components';

@NgModule({
  declarations: [ModalqrcodeComponent, MessagesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessagesRoutingModule,
    DirectivesModule,
    LoadingModule,
    InProgressModule,
    RetryModule,
  ],
})
export class MessagesModule {}
