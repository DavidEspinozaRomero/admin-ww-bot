import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  SideMenuComponent,
  NotfoundComponent,
  RetryComponent,
  InProgressComponent,
  LoadingComponent,
} from './components';
import { ErrInputMessageDirective } from './directives';

@NgModule({
  declarations: [
    SideMenuComponent,
    NotfoundComponent,
    RetryComponent,
    InProgressComponent,
    LoadingComponent,
    ErrInputMessageDirective,
  ],
  exports: [
    SideMenuComponent,
    NotfoundComponent,
    RetryComponent,
    InProgressComponent,
    LoadingComponent,
    ErrInputMessageDirective,
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
