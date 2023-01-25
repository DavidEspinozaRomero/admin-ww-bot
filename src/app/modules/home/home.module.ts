import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing';
import {
  AboutUsComponent,
  ContactComponent,
  HomeComponent,
  LandingComponent,
} from './pages';
import { InProgressModule } from '../shared';

@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    ContactComponent,
    AboutUsComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, InProgressModule],
})
export class HomeModule {}
