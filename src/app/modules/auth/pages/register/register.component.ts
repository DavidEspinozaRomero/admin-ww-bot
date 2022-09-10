import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { regexpPassword } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../../sevices/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  //#region variables
  registerForm: FormGroup = this.fb.group({
    username: [
      'test3',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(32),
        // Validators.pattern(),
      ],
    ],
    fullName: [
      'test',
      // [
      //   Validators.required,
      //   Validators.minLength(1),
      //   Validators.maxLength(32),
      //   // Validators.pattern(),
      // ],
    ],
    email: [
      'test3@deer.com',
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
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {}

  //#region methods
  register() {
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    this.authService.registerUser(this.registerForm.value).subscribe({
      next: res => {
        console.log(res);
        this.router.navigateByUrl('/settings');
      },
      error: console.log,
    });
  }
  //#endregion methods
}
