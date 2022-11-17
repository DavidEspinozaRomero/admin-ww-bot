import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { StorageService } from '../../../services';

@Injectable({ providedIn: 'root' })
export class MainService {
  private readonly BaseUrl = environment.UrlApi;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storage: StorageService
  ) {}

  getqrimg() {
    const URL = `${this.BaseUrl}bot-webwhatsap/qrcode`;
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Accept', `image/svg+xml`);
    return this.httpClient.get(URL, { headers });
  }

  createMessage(body: {}) {
    const URL = `${this.BaseUrl}messages`;
    return this.httpClient.post(URL, body);
  }

  getAllMessages() {
    const URL = `${this.BaseUrl}messages`;
    return this.httpClient.get(URL);
  }

  updateMessage(id: string, body: {}) {
    const URL = `${this.BaseUrl}messages/${id}`;
    return this.httpClient.patch(URL, body);
  }

  deleteMessage(id: string) {
    const URL = `${this.BaseUrl}messages/${id}`;
    return this.httpClient.delete(URL);
  }

  getCategories() {
    const URL = `${this.BaseUrl}messages/get-categories`;
    return this.httpClient.get(URL);
  }
}
