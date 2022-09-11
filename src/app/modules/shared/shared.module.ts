import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SideMenuComponent, NotfoundComponent],
  exports: [SideMenuComponent, NotfoundComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
