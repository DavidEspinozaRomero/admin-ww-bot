import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { ToastBaseService } from '../../../../services/toast.service';
import { UtilsService } from '../../../../utils/utils.service';
import { routes } from '../../auth.routing';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot({
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ],
      providers: [
        FormBuilder,
        HttpTestingController,
        ToastBaseService,
        AuthService,
        UtilsService,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Layout', () => {
    it('has email input', () => {
      const loginC = fixture.nativeElement as HTMLElement;
      const label = loginC.getElementsByTagName('label[for="email"]');
      const input = loginC.getElementsByTagName('input[id="email"]');

      expect(label).toBeTruthy();
      expect(input).toBeTruthy();
    });

    it('has password input', () => {
      const loginC = fixture.nativeElement as HTMLElement;
      const label = loginC.getElementsByTagName('label[for="password"]');
      const input = loginC.getElementsByTagName('input[id="password"]');

      expect(label).toBeTruthy();
      expect(input).toBeTruthy();
    });
    it('has submit button', () => {
      const loginC = fixture.nativeElement as HTMLElement;
      const button = loginC.querySelector('button') as HTMLButtonElement;

      expect(button).toBeTruthy();
      expect(button.textContent).toBe(' Login ');
    });
  });

  describe('Apis', () => {
    it('has loginUser function', () => {
      expect(typeof component.loginUser).toBe('function');
    });

    it('should call the service and send form value', () => {
      const spy = spyOn(service, 'loginUser').and.callFake(() => of());
      const loginC = fixture.nativeElement as HTMLElement;
      const email = loginC.querySelector(
        'input[id="email"]'
      ) as HTMLInputElement;
      const password = loginC.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;

      email.value = 'test1@gmail.com';
      email.dispatchEvent(new Event('input'));
      password.value = 'Asd1234.';
      password.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      component.login();

      expect(spy).withContext('form is correct fill').toHaveBeenCalled();
    });
  });

  describe('Methods', () => {
    it('has login function', () => {
      expect(typeof component.login).toBe('function');
    });

    it('should check if form is invalid', () => {
      component.login();
      expect(component.loginForm.invalid)
        .withContext('form is empty | has errors')
        .toBeTrue();
    });

    it('should check if form is valid', () => {
      const loginC = fixture.nativeElement as HTMLElement;
      const email = loginC.querySelector(
        'input[id="email"]'
      ) as HTMLInputElement;
      const password = loginC.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;

      email.value = 'test1@gmail.com';
      email.dispatchEvent(new Event('input'));
      password.value = 'Asd1234.';
      password.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      component.login();

      expect(component.loginForm.invalid)
        .withContext('form is full')
        .toBeFalse();
    });
  });
});
