import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ErrInputMessageDirective } from './directives';

@NgModule({
  declarations: [ErrInputMessageDirective],
  exports: [ErrInputMessageDirective],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
