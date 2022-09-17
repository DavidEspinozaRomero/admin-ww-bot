import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidateTokenGuard } from './modules/auth/guards/validate-token.guard';

const routes: Routes = [
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('./modules/auth/auth.module').then((m) => m.AuthModule),
  // },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
    // canActivate: [ValidateTokenGuard],
    // canLoad: [ValidateTokenGuard],
  },
  { path: '**', redirectTo: 'admin' },
  // { path: '**', redirectTo: 'auth' },
  // { path: '', pathMatch: 'full', redirectTo: 'path' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
