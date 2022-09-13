import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { StorageService } from '../../shared/services/storage.service';
import { LocalStorageKey } from 'src/app/modules/shared/interfaces/storage.interface';
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
    const headers: HttpHeaders = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.storage.getLocalStorage(LocalStorageKey.token) || ''}`
    );
    return this.httpClient.get<authloginResponse>(URL, { headers }).pipe(
      map((res) => {
        this.setUserAndToken(res);
        return true;
      }),
      catchError((err) => of(false))
    );
  }

  //#region method
  setUserAndToken(res: authloginResponse) {
    const { message, token, ...userData } = res;
    this.storage.setLocalStorage(LocalStorageKey.token, token);
    this._user = userData;
  }
  //#endregion method

  //#region
  //#endregion
}
