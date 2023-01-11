import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  isValid(formc: FormControl & any): boolean {
    return formc?.errors && formc?.touched;
  }

  /**
   * It returns true if the form control is touched and has errors
   * @param {FormGroup} form - FormGroup
   * @param {string | number} control - string | number
   * @returns A boolean value.
   */
  isValidControl(formg: FormGroup | any, control: string | number): boolean {
    return formg.controls[control].touched && formg.controls[control].errors;
  }

  // isValidArr(forma: FormArray | any, control: string | number): boolean {
  //   return forma.controls[control].touched && forma.controls[control].errors;
  // }
}
