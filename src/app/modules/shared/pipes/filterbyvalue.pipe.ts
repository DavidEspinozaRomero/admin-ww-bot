import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbyvalue'
})
export class FilterbyvaluePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
