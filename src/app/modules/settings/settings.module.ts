import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings.routing';
import { HomeComponent } from './pages/home/home.component';
import { DirectivesModule } from '../shared';
import { InProgressComponent, LoadingComponent } from '../shared/components';
import { SettingsComponent } from './pages/settings/settings.component';


@NgModule({
  declarations: [HomeComponent, SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    DirectivesModule,
    LoadingComponent,
    InProgressComponent,
  ],
})
export class SettingsModule {}
