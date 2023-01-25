import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SideMenuComponent } from './side-menu.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [SideMenuComponent],
  declarations: [SideMenuComponent],
  providers: [],
})
export class SideMenuModule { }
