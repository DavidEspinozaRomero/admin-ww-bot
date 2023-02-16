import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MessagesRoutingModule } from './messages.routing';

import { ModalqrcodeComponent } from './components/modalqrcode/modalqrcode.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { DirectivesModule } from '../shared';
import {
  InProgressComponent,
  LoadingComponent,
  RetryComponent,
} from '../shared/components';

@NgModule({
  declarations: [ModalqrcodeComponent, MessagesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessagesRoutingModule,
    DirectivesModule,
    LoadingComponent,
    InProgressComponent,
    RetryComponent,
  ],
})
export class MessagesModule {}
