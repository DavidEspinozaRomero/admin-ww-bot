import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UtilsService } from 'src/app/utils';
import { RegExpAPP } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
})
export class RestorePasswordComponent implements OnInit {
  //#region variables
  isSend = false;
  token?: string;
  passwordControl: FormControl = this.fb.control('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(30),
    Validators.pattern(RegExpAPP.password),
  ]);
  //#endregion variables

  constructor(
    private readonly fb: FormBuilder,
    public readonly utils: UtilsService,
    private readonly authService: AuthService,
    public readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (res: any) => {
        if (!res?.token) return;
        this.token = res.token;
      },
    });
  }

  //#region Apis
  restorePassword() {
    console.log(this.passwordControl.value);

    this.authService
      .restorePassword({
        token: this.token,
        password: this.passwordControl.value,
      })
      .subscribe({
        next: (res) => {
          this.isSend = true;
        },
      });
  }
  //#endregion Apis

  //#region Methods
  save() {
    this.passwordControl.markAllAsTouched();
    if (this.passwordControl.invalid) {
      return;
    }
    this.restorePassword();
  }
  //#endregion Methods
}

//#region
//#endregion
