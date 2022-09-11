import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ToastBaseService } from '../../../shared/services/toast.service';
import { RegExpAPP } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  //#region variables
  registerForm: FormGroup = this.fb.group({
    username: [
      'test3',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(32),
        // Validators.pattern(RegExpAPP.username),
      ],
    ],
    fullName: [
      'test',
      // [
      //   Validators.required,
      //   Validators.minLength(1),
      //   Validators.maxLength(32),
      //   Validators.pattern(RegExpAPP.name),
      // ],
    ],
    email: [
      'test3@deer.com',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(1),
        Validators.maxLength(30),
        Validators.pattern(RegExpAPP.email),
      ],
    ],
    password: [
      'Asd1234.',
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
    private readonly toast: ToastBaseService
  ) {}

  //#region methods
  register() {
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
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
  //#endregion methods
}
