import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoadingService } from '../services';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  #totalRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.#totalRequests++;
    this.loadingService.isLoading.emit(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.#totalRequests--;
        if (this.#totalRequests === 0) {
          this.loadingService.isLoading.emit(false);
        }
      })
    );
  }
}
