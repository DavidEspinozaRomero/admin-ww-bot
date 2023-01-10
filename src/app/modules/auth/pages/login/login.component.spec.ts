import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { screen, render } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { CustomToastService } from '../../../../services/toast.service';
import { UtilsService } from '../../../../utils/utils.service';
import { routes } from '../../auth.routing';

// #region Mocks
const loginUserMock = {
  message: 'Welcome back',
  id: 'dc19037b-fd5d-41b0-9fb7-c4c0328937f7',
  username: 'test1',
  email: 'test1@gmail.com',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRjMTkwMzdiLWZkNWQtNDFiMC05ZmI3LWM0YzAzMjg5MzdmNyIsImlhdCI6MTY3MDUyOTY4MywiZXhwIjoxNjcwNTM2ODgzfQ.W9iqvFSY8oE1Ue3wWqriGb1nVUiwyafMuySPLbqB2ww',
};

const authServiceMock = createMock(AuthService);
authServiceMock.loginUser = jest.fn(() => of(loginUserMock));

// #endregion Mocks

describe('LoginComponent', () => {
  let component: LoginComponent;

  beforeEach(async () => {
    const rendered = await render(LoginComponent, {
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
      providers: [FormBuilder, CustomToastService, UtilsService, AuthService],
      componentProviders: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    });
    component = rendered.fixture.componentInstance;
  });

  describe('Layout', () => {
    it('has registro header', async () => {
      const header = screen.getByRole('heading', { name: 'Login' });
      expect(header).toBeInTheDocument();
    });

    it('has email input', () => {
      const input = screen.getByLabelText('Email');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'email');
    });
    it('has password input', () => {
      const input = screen.getByLabelText('Password');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'password');
    });
    it('has login button', () => {
      const button = screen.getByRole('button', { name: 'Login' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Apis', () => {
    it('has login function', () => {
      expect(typeof component.loginUser).toBe('function');
    });

    it('should call the service', async () => {
      const email = screen.getByLabelText('Email');
      const password = screen.getByLabelText('Password');
      const button = screen.getByRole('button', { name: 'Login' });

      await userEvent.type(email, 'test1@gmail.com');
      await userEvent.type(password, 'Asd1234.');
      await userEvent.click(button);

      expect(authServiceMock.loginUser).toHaveBeenCalled();
      // authServiceMock.loginUser.
    });
  });

  describe('Methods', () => {
    it('has login function', () => {
      expect(typeof component.login).toBe('function');
    });

    it('should check if form is invalid', () => {
      component.login();
      expect(component.loginForm.invalid).toBeTruthy();
    });

    it('should check if form is valid', async () => {
      const email = screen.getByLabelText('Email');
      const password = screen.getByLabelText('Password');

      await userEvent.type(email, 'test1@gmail.com');
      await userEvent.type(password, 'Asd1234.');

      component.login();

      expect(component.loginForm.invalid).toBeFalsy();
    });
  });
});

//#region Jasmine
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';

// import { ToastrModule } from 'ngx-toastr';

// import { LoginComponent } from './login.component';
// import { AuthService } from '../../services/auth.service';
// import { CustomToastService } from '../../../../services/toast.service';
// import { UtilsService } from '../../../../utils/utils.service';
// import { routes } from '../../auth.routing';
// import { of } from 'rxjs';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let service: AuthService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       imports: [
//         HttpClientTestingModule,
//         ReactiveFormsModule,
//         RouterTestingModule.withRoutes(routes),
//         ToastrModule.forRoot({
//           timeOut: 3000,
//           positionClass: 'toast-bottom-right',
//           preventDuplicates: true,
//         }),
//       ],
//       providers: [
//         FormBuilder,
//         HttpTestingController,
//         CustomToastService,
//         AuthService,
//         UtilsService,
//       ],
//       schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     service = TestBed.inject(AuthService);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('Layout', () => {
//     it('has email input', () => {
//       const loginC = fixture.nativeElement as HTMLElement;
//       const label = loginC.getElementsByTagName('label[for="email"]');
//       const input = loginC.getElementsByTagName('input[id="email"]');

//       expect(label).toBeTruthy();
//       expect(input).toBeTruthy();
//     });

//     it('has password input', () => {
//       const loginC = fixture.nativeElement as HTMLElement;
//       const label = loginC.getElementsByTagName('label[for="password"]');
//       const input = loginC.getElementsByTagName('input[id="password"]');

//       expect(label).toBeTruthy();
//       expect(input).toBeTruthy();
//     });
//     it('has submit button', () => {
//       const loginC = fixture.nativeElement as HTMLElement;
//       const button = loginC.querySelector('button') as HTMLButtonElement;

//       expect(button).toBeTruthy();
//       expect(button.textContent).toBe(' Login ');
//     });
//   });

//   describe('Apis', () => {
//     it('has loginUser function', () => {
//       expect(typeof component.loginUser).toBe('function');
//     });

//     it('should call the service and send form value', () => {
//       const spy = spyOn(service, 'loginUser').and.callFake(() => of());
//       const loginC = fixture.nativeElement as HTMLElement;
//       const email = loginC.querySelector(
//         'input[id="email"]'
//       ) as HTMLInputElement;
//       const password = loginC.querySelector(
//         'input[id="password"]'
//       ) as HTMLInputElement;

//       email.value = 'test1@gmail.com';
//       email.dispatchEvent(new Event('input'));
//       password.value = 'Asd1234.';
//       password.dispatchEvent(new Event('input'));
//       fixture.detectChanges();

//       component.login();

//       expect(spy).withContext('form is correct fill').toHaveBeenCalled();
//     });
//   });

//   describe('Methods', () => {
//     it('has login function', () => {
//       expect(typeof component.login).toBe('function');
//     });

//     it('should check if form is invalid', () => {
//       component.login();
//       expect(component.loginForm.invalid)
//         .withContext('form is empty | has errors')
//         .toBeTrue();
//     });

//     it('should check if form is valid', () => {
//       const loginC = fixture.nativeElement as HTMLElement;
//       const email = loginC.querySelector(
//         'input[id="email"]'
//       ) as HTMLInputElement;
//       const password = loginC.querySelector(
//         'input[id="password"]'
//       ) as HTMLInputElement;

//       email.value = 'test1@gmail.com';
//       email.dispatchEvent(new Event('input'));
//       password.value = 'Asd1234.';
//       password.dispatchEvent(new Event('input'));
//       fixture.detectChanges();

//       component.login();

//       expect(component.loginForm.invalid)
//         .withContext('form is full')
//         .toBeFalse();
//     });
//   });
// });

//#endregion Jasmine

