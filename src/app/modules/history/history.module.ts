import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history.routing';
import { HomeComponent } from './pages/home/home.component';
import { DirectivesModule } from '../shared';
import { InProgressModule, LoadingModule } from '../shared/components';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    DirectivesModule,
    LoadingModule,
    InProgressModule,
  ],
})
export class HistoryModule {}
