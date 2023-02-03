import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomToastService } from '../../../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { RegExpAPP } from '../../interfaces/auth.interface';
import { UtilsService } from '../../../../utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  //#region variables
  loginForm: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(1),
        Validators.maxLength(30),
        Validators.pattern(RegExpAPP.email),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern(RegExpAPP.password),
      ],
    ],
  });
  //#endregion variables
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toast: CustomToastService,
    private readonly authService: AuthService,
    readonly utils: UtilsService
  ) {}

  //#region Apis
  //Post
  loginUser() {
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (res) => {
        this.toast.success(res.message);
      },
      error: (err) => {
        this.toast.error(err.error.message);
      },
      complete: () => this.router.navigateByUrl('/messages'),
    });
  }

  //#endregion Apis

  //#region methods
  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    this.loginUser();
  }
  //#endregion methods
}
