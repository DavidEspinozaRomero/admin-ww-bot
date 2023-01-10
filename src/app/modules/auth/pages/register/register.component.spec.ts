// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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

import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { CustomToastService } from '../../../../services/toast.service';
import { UtilsService } from '../../../../utils/utils.service';
import { routes } from '../../auth.routing';

// #region Mocks
const registerUserMock = {
  message: 'Welcome back',
  id: 'dc19037b-fd5d-41b0-9fb7-c4c0328937f7',
  username: 'test1',
  email: 'test1@gmail.com',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRjMTkwMzdiLWZkNWQtNDFiMC05ZmI3LWM0YzAzMjg5MzdmNyIsImlhdCI6MTY3MDUyOTY4MywiZXhwIjoxNjcwNTM2ODgzfQ.W9iqvFSY8oE1Ue3wWqriGb1nVUiwyafMuySPLbqB2ww',
};

const authServiceMock = createMock(AuthService);
authServiceMock.registerUser = jest.fn(() => of(registerUserMock));

// #endregion Mocks

describe('RegisterComponent', () => {
  let component: RegisterComponent;

  beforeEach(async () => {
    const rendered = await render(RegisterComponent, {
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
      const header = screen.getByRole('heading', { name: 'Registro' });
      expect(header).toBeInTheDocument();
    });

    it('has username input', () => {
      const input = screen.getByLabelText('Nombre');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
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
    it('has register button', () => {
      const button = screen.getByRole('button', { name: 'Registro' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Apis', () => {
    it('has register function', () => {
      expect(typeof component.registerUser).toBe('function');
    });

    it('should call the service', async () => {
      const username = screen.getByLabelText('Nombre');
      const email = screen.getByLabelText('Email');
      const password = screen.getByLabelText('Password');
      const button = screen.getByRole('button', { name: 'Registro' });

      await userEvent.type(username, 'test1');
      await userEvent.type(email, 'test1@gmail.com');
      await userEvent.type(password, 'Asd1234.');
      await userEvent.click(button);

      expect(authServiceMock.registerUser).toHaveBeenCalled();
    });
  });

  describe('Methods', () => {
    it('has register function', () => {
      expect(typeof component.register).toBe('function');
    });

    it('should check if form is invalid', () => {
      component.register();
      expect(component.registerForm.invalid).toBeTruthy();
    });

    it('should check if form is valid', async () => {
      const username = screen.getByLabelText('Nombre');
      const email = screen.getByLabelText('Email');
      const password = screen.getByLabelText('Password');

      await userEvent.type(username, 'test1');
      await userEvent.type(email, 'test1@gmail.com');
      await userEvent.type(password, 'Asd1234.');

      component.register();

      expect(component.registerForm.invalid).toBeFalsy();
    });
  });
});
