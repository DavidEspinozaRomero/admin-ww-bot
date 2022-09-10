import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly BaseUrl = environment.UrlApi;
  private _user?: User;

  public get user() {
    return { ...this._user };
  }

  constructor(private httpClient: HttpClient) {}

  registerUser(json: registerUser) {
    let URL = `${this.BaseUrl}auth/register`;
    return this.httpClient.post<any>(URL, json);
  }
  loginUser(json: loginUser) {
    let URL = `${this.BaseUrl}auth/login`;
    return this.httpClient.post<authloginResponse>(URL, json).pipe(
      tap((res) => {
        const { message, token, ...userData } = res;
        this._user = userData;
      }),
      // map()
      
    );
  }
}

export interface registerUser {
  username: string;
  email: string;
  password: string;
}
export interface loginUser {
  email: string;
  password: string;
}

export interface authloginResponse {
  email: string;
  id: string;
  message: string;
  token: string;
  username: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}
// const asd = {};
