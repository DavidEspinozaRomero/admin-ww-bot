import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { InProgressModule, LoadingModule } from '../shared/components';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    LoadingModule,
    InProgressModule,
  ],
})
export class SettingsModule {}
