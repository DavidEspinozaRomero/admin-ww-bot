import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterbyvaluePipe } from './filterbyvalue.pipe';
import { FilterbykeyvaluePipe } from './filterbykeyvalue.pipe';

@NgModule({
  declarations: [FilterbyvaluePipe, FilterbykeyvaluePipe],
  exports: [FilterbyvaluePipe, FilterbykeyvaluePipe],
  imports: [CommonModule],
})
export class PipesModule {}
