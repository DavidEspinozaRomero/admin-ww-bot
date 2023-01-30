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
import { CardImgLrComponent } from './components/card-img-lr/card-img-lr.component';

@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    ContactComponent,
    AboutUsComponent,
    CardImgLrComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, InProgressModule],
})
export class HomeModule {}
