import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main.routing';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './pages/layout/layout.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SettingsComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
