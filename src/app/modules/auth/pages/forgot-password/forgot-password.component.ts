import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomToastService } from 'src/app/services';

import { UtilsService } from 'src/app/utils';
import { RegExpAPP } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  //#region variables
  isSend = false;
  emailControl: FormControl = this.fb.control('', [
    Validators.required,
    Validators.email,
    Validators.minLength(1),
    Validators.maxLength(30),
    Validators.pattern(RegExpAPP.email),
  ]);
  //#endregion variables

  constructor(
    private readonly fb: FormBuilder,
    public readonly utils: UtilsService,
    public readonly authService: AuthService
  ) {}

  ngOnInit(): void {}

  //#region Apis
  forgotPassword() {
    console.log(this.emailControl.value);

    this.authService
      .forgotPassword({ email: this.emailControl.value })
      .subscribe({
        next: (res) => {
          this.isSend = true;
        },
      });
  }
  //#endregion Apis

  //#region Methods
  save() {
    this.emailControl.markAllAsTouched();
    if (this.emailControl.invalid) {
      return;
    }
    this.forgotPassword();
  }
  //#endregion Methods
}

//#region
//#endregion
