import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  /**
   * It returns true if the form control is touched and has errors
   * @param {FormGroup} form - FormGroup
   * @param {string | number} control - string | number
   * @returns A boolean value.
   */
  isValidControl(form: FormGroup | any, control: string | number) {
    return form.controls[control].touched && form.controls[control].errors;
  }

}
