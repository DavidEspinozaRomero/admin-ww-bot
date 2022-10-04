import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { LocalStorageKey } from '../../shared/interfaces/storage.interface';
import { StorageService } from '../../shared/services';

@Injectable({ providedIn: 'root' })
export class MainService {
  private readonly BaseUrl = environment.UrlApi;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storage: StorageService
  ) {}

  // getqrimg() {
  //   const URL = `${this.BaseUrl}bot-webwhatsap/qrcode`;
  //   const headers: HttpHeaders = new HttpHeaders();
  //   headers.set('Accept', `image/svg+xml`);
  //   return this.httpClient.get(URL, { headers, responseType: 'text' });
  // }

  createMessage(body: {}) {
    const URL = `${this.BaseUrl}messages`;
    const headers: HttpHeaders = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.storage.getLocalStorage(LocalStorageKey.token) || ''}`
    );
    return this.httpClient.post(URL, body, { headers });
  }

  getAllMessages() {
    const URL = `${this.BaseUrl}messages`;
    const headers: HttpHeaders = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.storage.getLocalStorage(LocalStorageKey.token) || ''}`
    );
    return this.httpClient.get(URL, { headers });
  }

  updateMessage(id: string, body: {}) {
    const URL = `${this.BaseUrl}messages/${id}`;
    const headers: HttpHeaders = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.storage.getLocalStorage(LocalStorageKey.token) || ''}`
    );
    return this.httpClient.patch(URL, body, { headers });
  }

  deleteMessage(id: string) {
    const URL = `${this.BaseUrl}messages/${id}`;
    const headers: HttpHeaders = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.storage.getLocalStorage(LocalStorageKey.token) || ''}`
    );
    return this.httpClient.delete(URL, { headers });
  }
}
