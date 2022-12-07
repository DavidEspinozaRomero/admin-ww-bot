import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule,  } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { ToastBaseService } from '../../../../services/toast.service';
import { UtilsService } from '../../../../utils/utils.service';
import { of } from 'rxjs';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot({
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ],
      providers: [
        FormBuilder,
        AuthService,
        ToastBaseService,
        UtilsService,
        HttpTestingController,
      ],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Layout', () => {
    it('has username input', () => {
      const registerC = fixture.nativeElement as HTMLElement;
      const label = registerC.querySelector('label[for="username"]');
      const input = registerC.querySelector('input[id="username"]');

      expect(label).toBeTruthy();
      expect(input).toBeTruthy();
    });
    it('has email input', () => {
      const registerC = fixture.nativeElement as HTMLElement;
      const label = registerC.querySelector('label[for="email"]');
      const input = registerC.querySelector('input[id="email"]');

      expect(label).toBeTruthy();
      expect(input).toBeTruthy();
    });
    it('has password input', () => {
      const registerC = fixture.nativeElement as HTMLElement;
      const label = registerC.querySelector('label[for="password"]');
      const input = registerC.querySelector('input[id="password"]');

      expect(label).toBeTruthy();
      expect(input).toBeTruthy();
    });
    it('has register button', () => {
      const registerC = fixture.nativeElement as HTMLElement;
      const button = registerC.querySelector('button');

      expect(button?.textContent).toBe(' Registro ');
    });
  });
  describe('Apis', () => {
    it('has register function', () => {
      expect(typeof component.registerUser).toBe('function');
    });

    it('should call the service and send form value', () => {
      const spy = spyOn(service, 'registerUser').and.callFake(() => of({}));
      const registerC = fixture.nativeElement as HTMLElement;
      const username = registerC.querySelector(
        'input[id="username"]'
      ) as HTMLInputElement;
      const email = registerC.querySelector(
        'input[id="email"]'
      ) as HTMLInputElement;
      const password = registerC.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;

      username.value = 'test1';
      username.dispatchEvent(new Event('input'));
      email.value = 'test1@gmail.com';
      email.dispatchEvent(new Event('input'));
      password.value = 'Asd1234.';
      password.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      component.register();

      expect(spy).withContext('has been call').toHaveBeenCalled();
      //form value expect
    });
  });

  describe('Methods', () => {
    it('has register function', () => {
      expect(typeof component.register).toBe('function');
    });
    it('should check if form is invalid', () => {
      component.register();
      expect(component.registerForm.invalid)
        .withContext('form is empty | has errors')
        .toBeTrue();
    });
    it('should check if form is valid', () => {
      const registerC = fixture.nativeElement as HTMLElement;
      const username = registerC.querySelector(
        'input[id="username"]'
      ) as HTMLInputElement;
      const email = registerC.querySelector(
        'input[id="email"]'
      ) as HTMLInputElement;
      const password = registerC.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;

      username.value = 'test1';
      username.dispatchEvent(new Event('input'));
      email.value = 'test1@gmail.com';
      email.dispatchEvent(new Event('input'));
      password.value = 'Asd1234.';
      password.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      component.register();

      expect(component.registerForm.invalid)
        .withContext('form is full')
        .toBeFalse();
    });
  });
});
