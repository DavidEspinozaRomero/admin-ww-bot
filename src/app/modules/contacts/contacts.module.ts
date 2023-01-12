import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ContactsComponent } from './pages/contacts/contacts.component';

@NgModule({
  declarations: [ContactsComponent],
  imports: [CommonModule, ContactsRoutingModule, SharedModule],
})
export class ContactsModule {}
