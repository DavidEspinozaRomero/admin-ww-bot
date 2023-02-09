import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings.routing';
import { HomeComponent } from './pages/home/home.component';
import { DirectivesModule } from '../shared';
import { InProgressModule, LoadingModule } from '../shared/components';
import { SettingsComponent } from './pages/settings/settings.component';


@NgModule({
  declarations: [HomeComponent, SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    DirectivesModule,
    LoadingModule,
    InProgressModule,
  ],
})
export class SettingsModule {}
