// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { StorageService } from '../../../services/storage.service';
import { of } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

//#region 
//#endregion 
//#region mocks
const loginRes = {
  message: 'Welcome back',
  id: 'dc19037b-fd5d-41b0-9fb7-c4c0328937f7',
  username: 'test1',
  email: 'test1@gmail.com',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRjMTkwMzdiLWZkNWQtNDFiMC05ZmI3LWM0YzAzMjg5MzdmNyIsImlhdCI6MTY3MDUyOTY4MywiZXhwIjoxNjcwNTM2ODgzfQ.W9iqvFSY8oE1Ue3wWqriGb1nVUiwyafMuySPLbqB2ww',
};

const storageServiceMock: Partial<StorageService> = {
  setLocalStorage: (key, data) => {},
}
//#endregion mocks

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{provide:StorageService, useValue: storageServiceMock }],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new AuthService(httpClientSpy, storageServiceMock as StorageService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Apis', () => {
    it('has registerUser function', () => {
      expect(typeof service.registerUser).toBe('function');
    });

    it('should return a response', () => {
      const json = {
        email: 'test1@gmail.com',
        password: 'Asd1234.',
        username: 'test1',
      };

      httpClientSpy.post.and.returnValue(of(loginRes));
      service.registerUser(json).subscribe({
        next: (res) => {
          expect(res).toBe(loginRes);
        },
      });
    });

    it('has loginUser function', () => {
      expect(typeof service.loginUser).toBe('function');
    });

    it('should return a response', () => {
      const json = {
        email: 'test1@gmail.com',
        password: 'Asd1234.',
        username: 'test1',
      };

      httpClientSpy.post.and.returnValue(of(loginRes));
      service.loginUser(json).subscribe({
        next: (res) => {
          expect(res).toBe(loginRes);
        },
      });
    });

    it('has validarToken function', () => {
      expect(typeof service.validarToken).toBe('function');
    });

    it('should validate Token', () => {
      httpClientSpy.get.and.returnValue(of(loginRes));
      service.validarToken().subscribe({
        next: (res) => {
          expect(res).toBe(true);
        },
      });
    });
  });

  describe('Methods', () => {
    it('has setUserAndToken function', () => {
      expect(typeof service.setUserAndToken).toBe('function');
    });

    // it('should storage UserAndToken ', () => {
    //   const spy = spyOn(storageServiceMock, 'setUserAndToken').and.callFake()
    //   service.setUserAndToken(loginRes)
    //   service.user
    //   expect().toBe('');
    // });
  });
});
