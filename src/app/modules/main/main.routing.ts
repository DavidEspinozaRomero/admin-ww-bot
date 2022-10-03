import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MessagesComponent,
  HistoryComponent,
  DashboardComponent,
  ContactsComponent,
  SettingsComponent,
  LayoutComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'settings', component: SettingsComponent },

      { path: '**', redirectTo: 'messages' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
