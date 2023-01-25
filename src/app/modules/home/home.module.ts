import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing';
import {
  AboutUsComponent,
  ContactComponent,
  HomeComponent,
  LandingComponent,
} from './pages';

@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    ContactComponent,
    AboutUsComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
