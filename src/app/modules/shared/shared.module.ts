import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RetryComponent } from './components/retry/retry.component';
import { InProgressComponent } from './components/in-progress/in-progress.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrInputMessageDirective } from './directives/err-input-message.directive';

@NgModule({
  declarations: [
    SideMenuComponent,
    NotfoundComponent,
    RetryComponent,
    InProgressComponent,
    LoadingComponent,
    ErrInputMessageDirective
  ],
  exports: [
    SideMenuComponent,
    NotfoundComponent,
    RetryComponent,
    InProgressComponent,
    LoadingComponent,
    ErrInputMessageDirective
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
