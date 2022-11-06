import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from '../modules/shared/services';
import { LocalStorageKey } from '../modules/shared/interfaces/storage.interface';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly storage: StorageService) {}

  private readonly headers: HttpHeaders = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.storage.getLocalStorage(LocalStorageKey.token) || ''}`
  );

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = request.clone({ headers: this.headers });
    return next.handle(authReq);
  }
}
