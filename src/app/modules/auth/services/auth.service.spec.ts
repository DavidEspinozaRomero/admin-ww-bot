import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './auth.service';
import { StorageService } from '../../../services';

//#region Mocks
const response = {
  login: {
    message: 'Welcome back',
    id: 'dc19037b-fd5d-41b0-9fb7-c4c0328937f7',
    username: 'test1',
    email: 'test1@gmail.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRjMTkwMzdiLWZkNWQtNDFiMC05ZmI3LWM0YzAzMjg5MzdmNyIsImlhdCI6MTY3MDUyOTY4MywiZXhwIjoxNjcwNTM2ODgzfQ.W9iqvFSY8oE1Ue3wWqriGb1nVUiwyafMuySPLbqB2ww',
  },
  register: {
    message: 'User Created',
    user: {
      username: 'test3',
      email: 'test3@gmail.com',
      id: 'a15899eb-9da9-47aa-956d-fc3683c93b95',
      isActive: true,
      roles: ['user'],
    },
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImExNTg5OWViLTlkYTktNDdhYS05NTZkLWZjMzY4M2M5M2I5NSIsImlhdCI6MTY3MDg3NTE3OSwiZXhwIjoxNjcwODgyMzc5fQ.pcmkMJmp_hJLX6jf6oK2cuF9vro6SVhLdvauG0updGU',
  },
};
//#endregion Mocks

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController & any;
  let storageMock: StorageService & any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  beforeEach(() => {
    httpMock = {
      get: jest.fn(),
      post: jest.fn(),
    };
    storageMock = {
      setLocalStorage: jest.fn()
    }
    service = new AuthService(httpMock, storageMock);
    // service = TestBed.inject(AuthService);
  });
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientTestingModule],
  //   });
  //   service = TestBed.inject(AuthService);
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Apis', () => {
    it('has registerUser function', () => {
      expect(typeof service.registerUser).toBe('function');
    });
    it('registerUser should send json and create new user', (done) => {
      const url = 'http://localhost:3000/auth/register';
      const payload = {
        username: 'test4',
        email: 'test4@gmail.com',
        password: 'Asd1234.',
      };

      jest.spyOn(httpMock, 'post').mockReturnValue(of(response.register));
      service.registerUser(payload).subscribe({
        next: (res) => {
          expect(res).toEqual(response.register);
          done();
        },
        error: console.log,
      });

      expect(httpMock.post).toBeCalledTimes(1);
      expect(httpMock.post).toBeCalledWith(url, payload);
    });
    it('registerUser should throw error', (done) => {
      const url = 'http://localhost:3000/auth/register';
      const payload = {
        username: 'test4',
        email: 'test4@gmail.com',
        password: 'Asd1234.',
      };
      const error = new HttpErrorResponse({
        error: 'test error message',
        status: 404,
        statusText: 'not found',
      });

      jest.spyOn(httpMock, 'post').mockReturnValue(throwError(() => error));
      service.registerUser(payload).subscribe({
        next: console.log,
        error: (err) => {
          expect(err.message).toContain('404 not found');
          done();
        },
      });

      expect(httpMock.post).toBeCalledTimes(1);
      expect(httpMock.post).toBeCalledWith(url, payload);
    });

    it('has loginUser function', () => {
      expect(typeof service.loginUser).toBe('function');
    });
    it('loginUser should send json and login', (done) => {
      const url = 'http://localhost:3000/auth/login';
      const payload = {
        email: 'test4@gmail.com',
        password: 'Asd1234.',
      };

      jest.spyOn(httpMock, 'post').mockReturnValue(of(response.login));
      service.loginUser(payload).subscribe({
        next: (res) => {
          expect(res).toEqual(response.login);
          done();
        },
        error: console.log,
      });

      expect(httpMock.post).toBeCalledTimes(1);
      expect(httpMock.post).toBeCalledWith(url, payload);
    });
    it('loginUser should throw error', (done) => {
      const url = 'http://localhost:3000/auth/login';
      const payload = {
        username: 'test4',
        email: 'test4@gmail.com',
        password: 'Asd1234.',
      };
      const error = new HttpErrorResponse({
        error: '404 not found',
        status: 404,
        statusText: 'user incorrect',
      });

      jest.spyOn(httpMock, 'post').mockReturnValue(throwError(() => error));
      service.loginUser(payload).subscribe({
        next: console.log,
        error: (err) => {
          expect(err.message).toContain('404 user incorrect');
          done();
        },
      });

      expect(httpMock.post).toBeCalledTimes(1);
      expect(httpMock.post).toBeCalledWith(url, payload);
    });

    it('has validarToken function', () => {
      expect(typeof service.validarToken).toBe('function');
    });
    it('validarToken should send token', (done) => {
      const url = 'http://localhost:3000/auth/check-status';

      jest.spyOn(httpMock, 'get').mockReturnValue(of(true));
      service.validarToken().subscribe({
        next: (res) => {
          expect(res).toBeTruthy();
          expect(storageMock.setLocalStorage).toBeCalledTimes(1);
          done();
        },
        error: console.log,
      });

      expect(httpMock.get).toBeCalledTimes(1);
      expect(httpMock.get).toBeCalledWith(url);
    });
    it('validarToken should throw error', (done) => {
      const url = 'http://localhost:3000/auth/check-status';
      const error = new HttpErrorResponse({
        error: '401 un authorice',
        status: 401,
        statusText: 'user authorice',
      });

      const spystorage = jest.spyOn(storageMock, 'setLocalStorage')
      jest.spyOn(httpMock, 'get').mockReturnValue(throwError(() => error));
      service.validarToken().subscribe({
        next: (res) => {
          expect(res).toBeFalsy();
          done();
        },
        error: console.log,
      });
      // service.validarToken().subscribe({
      //   next: console.log,
      //   error: (err) => {
      //     expect(err.message).toContain('401 user authorice');
      //     done();
      //   },
      // });

      expect(httpMock.get).toBeCalledTimes(1);
      expect(httpMock.get).toBeCalledWith(url);
    });
  });

  describe('Methods', () => {
    it('has setUserAndToken function', () => {
      expect(typeof service.setUserAndToken).toBe('function');
    });
  });
});


