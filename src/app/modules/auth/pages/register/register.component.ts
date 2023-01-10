import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CustomToastService } from '../../../../services/toast.service';
import { RegExpAPP } from '../../interfaces/auth.interface';
import { UtilsService } from '../../../../utils/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  //#region variables
  registerForm: FormGroup = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32),
        // Validators.pattern(RegExpAPP.username),
      ],
    ],
    // fullName: [
    //   '',
    //   [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(32),
    //     Validators.pattern(RegExpAPP.name),
    //   ],
    // ],
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
    private readonly authService: AuthService,
    private readonly toast: CustomToastService,
    readonly utils: UtilsService
  ) {}
  //#region Apis
  //Post
  registerUser() {
    this.authService.registerUser(this.registerForm.value).subscribe({
      next: (res) => {
        this.toast.success(res.message);
        this.router.navigateByUrl('/admin/settings');
      },
      error: (err) => {
        this.toast.error(err.error.message);
      },
    });
  }

  //#endregion Apis

  //#region methods
  register() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }
    this.registerUser();
  }

  //#endregion methods
}
