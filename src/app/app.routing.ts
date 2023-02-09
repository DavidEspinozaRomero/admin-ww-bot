import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidateTokenGuard } from './modules/auth/guards/validate-token.guard';
import { LayoutComponent } from './layouts/layout/layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard],
  },
  {
    path: 'contacts',
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/contacts/contacts.module').then(
        (m) => m.ContactsModule
      ),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard],
  },
  {
    path: 'history',
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/history/history.module').then((m) => m.HistoryModule),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard],
  },
  {
    path: 'help',
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/help/help.module').then((m) => m.HelpModule),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard],
  },
  {
    path: 'messages',
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/messages/messages.module').then(
        (m) => m.MessagesModule
      ),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard],
  },
  {
    path: 'settings',
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard],
  },
  {
    path: 'payments',
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/payments/payments.module').then(
        (m) => m.PaymentsModule
      ),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard],
  },
  {
    path: '',
    title: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  { path: '**', redirectTo: '' },
  // { path: '', pathMatch: 'full', redirectTo: 'path' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
