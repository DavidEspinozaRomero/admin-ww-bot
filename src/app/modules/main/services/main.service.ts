
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class MainService {

  private readonly BaseUrl = environment.UrlApi;

  constructor(private httpClient: HttpClient) { }
  
  getqrimg() {
    const URL = `${this.BaseUrl}bot-webwhatsap/qrcode`
    return this.httpClient.get(URL)
  }
}