import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

// import { StorageService } from '../../../services';
import { environment } from '../../../../environments/environment';
import { Message, ResGetAllMessages } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private readonly BaseUrl = environment.UrlApi;

  constructor(
    private readonly httpClient: HttpClient
  ) // private readonly storage: StorageService
  {}

  getqrimg() {
    const URL = `${this.BaseUrl}bot-webwhatsap/qrcode`;
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Accept', `image/svg+xml`);
    return this.httpClient.get(URL, { headers, responseType: 'text' });
  }

  createMessage(body: {}) {
    const URL = `${this.BaseUrl}messages`;
    return this.httpClient.post(URL, body);
  }

  getAllMessages() {
    const URL = `${this.BaseUrl}messages`;
    return this.httpClient.get<ResGetAllMessages>(URL).pipe(
      tap( (res:ResGetAllMessages) => res.data )
    );
  }

  updateMessage(id: string | number, body: {}) {
    const URL = `${this.BaseUrl}messages/${id}`;
    return this.httpClient.patch(URL, body);
  }

  deleteMessage(id: string | number) {
    const URL = `${this.BaseUrl}messages/${id}`;
    return this.httpClient.delete(URL);
  }

  getCategories() {
    const URL = `${this.BaseUrl}messages/get-categories`;
    return this.httpClient.get(URL);
  }
}
