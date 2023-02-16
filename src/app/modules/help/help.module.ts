import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help.routing';
import { HomeComponent } from './pages/home/home.component';
import { DirectivesModule } from '../shared';
import { InProgressComponent, LoadingComponent } from '../shared/components';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HelpRoutingModule,
    DirectivesModule,
    LoadingComponent,
    InProgressComponent,
  ],
})
export class HelpModule {}
