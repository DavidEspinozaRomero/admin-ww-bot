import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing';
import {
  AboutUsComponent,
  ContactComponent,
  HomeComponent,
  LandingComponent,
} from './pages';
import { InProgressComponent } from '../shared';
import { CardImgLrComponent } from './components/card-img-lr/card-img-lr.component';
import { CardImgTextComponent } from './components/card-img-text/card-img-text.component';

@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    ContactComponent,
    AboutUsComponent,
    CardImgLrComponent,
    CardImgTextComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, InProgressComponent],
})
export class HomeModule {}
