import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../sevices/auth.service';

export const regexpPassword: RegExp =
  /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //#region variables
  loginForm: FormGroup = this.fb.group({
    email: [
      'test2@gmail.com',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(1),
        Validators.maxLength(30),
        // Validators.pattern(),
      ],
    ],
    password: [
      'Asd1234.',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern(regexpPassword),
      ],
    ],
  });
  //#endregion variables
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toast: ToastrService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {}

  //#region methods
  login() {
    if (this.loginForm.invalid) {
      console.log('invalid');
      return;
    }

    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigateByUrl('/settings');
        this.toast.success(res.message, 'Listo');
      },
      error: (err) => {
        console.log(err);
        this.toast.success(err.error.message, 'Ups...');

        // TODO: agregar un snackbar o toast para mostrar los errores
        // alert(err.error.message)
      },
    });
  }
  //#endregion methods
}
