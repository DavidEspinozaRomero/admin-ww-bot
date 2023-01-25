import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts.routing';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DirectivesModule } from '../shared';
import { InProgressModule, LoadingModule } from '../shared/components';

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    DirectivesModule,
    LoadingModule,
    InProgressModule,
  ],
})
export class ContactsModule {}
