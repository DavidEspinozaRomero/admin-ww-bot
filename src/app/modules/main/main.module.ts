import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main.routing';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { HistoryComponent } from './pages/history/history.component';
import { ContactsComponent } from './pages/contacts/contacts.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SettingsComponent,
    LayoutComponent,
    MessagesComponent,
    HistoryComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
