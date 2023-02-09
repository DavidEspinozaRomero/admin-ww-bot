import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  constructor(private readonly http: HttpClient) {}

  confirmPayment(order: {}) {
    const URL = `${environment.UrlApi}payments`;
    return this.http.post(URL, order);
  }
}
