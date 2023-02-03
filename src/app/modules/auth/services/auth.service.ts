import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  LocalStorageKey,
  StorageService,
} from '../../../services/storage.service';
import {
  authloginResponse,
  registerUser,
  loginUser,
  User,
} from '../interfaces/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly BaseUrl = environment.UrlApi;
  private _user?: User;

  public get user() {
    return { ...this._user };
  }

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storage: StorageService
  ) {}

  //#region Apis

  registerUser(json: registerUser) {
    const URL = `${this.BaseUrl}auth/register`;
    return this.httpClient.post<any>(URL, json);
  }
  loginUser(json: loginUser) {
    const URL = `${this.BaseUrl}auth/login`;
    return this.httpClient.post<authloginResponse>(URL, json).pipe(
      tap((res) => {
        this.setUserAndToken(res);
      })
    );
  }

  validarToken() {
    const URL = `${this.BaseUrl}auth/check-status`;
    return this.httpClient.get<authloginResponse>(URL).pipe(
      map((res) => {
        this.setUserAndToken(res);
        return true;
      }),
      catchError((err) => of(false))
    );
  }

  verifyEmail(token: {}) {
    const URL = `${this.BaseUrl}auth/verify-email`;
    return this.httpClient.post(URL, token);
  }

  forgotPassword(email: {}) {
    const URL = `${this.BaseUrl}auth/forgot-password`;
    return this.httpClient.post(URL, email);
  }

  restorePassword(json: {}) {
    const URL = `${this.BaseUrl}auth/restore-password`;
    return this.httpClient.post(URL, json);
  }

  //#endregion Apis

  //#region methods
  setUserAndToken(res: authloginResponse) {
    const { message, token, ...userData } = res;
    this.storage.setLocalStorage(LocalStorageKey.token, token);
    this._user = userData;
  }
  //#endregion method

  //#region
  //#endregion
}
