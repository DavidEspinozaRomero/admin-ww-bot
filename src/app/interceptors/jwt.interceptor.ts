import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from '../services';
import { LocalStorageKey } from '../services/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly storage: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers: HttpHeaders = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.storage.getLocalStorage(LocalStorageKey.token) || ''}`
    );
    const authReq = request.clone({ headers });
    return next.handle(authReq);
  }
}
