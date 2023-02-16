import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard.routing';
import { HomeComponent } from './pages/home/home.component';
import { DirectivesModule } from '../shared';
import { InProgressComponent, LoadingComponent } from '../shared/components';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DirectivesModule,
    LoadingComponent,
    InProgressComponent,
  ],
})
export class DashboardModule {}
