import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RetryComponent } from './components/retry/retry.component';
import { InProgressComponent } from './components/in-progress/in-progress.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    SideMenuComponent,
    NotfoundComponent,
    LayoutComponent,
    RetryComponent,
    InProgressComponent,
    LoadingComponent,
  ],
  exports: [
    SideMenuComponent,
    NotfoundComponent,
    LayoutComponent,
    RetryComponent,
    InProgressComponent,
    LoadingComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
