import { Injectable } from '@angular/core';
// import * as CryptoJS from 'crypto-js';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptService {

  constructor() { }

  //  // Encripta cualquier tipo de dato
  //  encrypt(data: any){
  //   return CryptoJS.AES.encrypt(JSON.stringify(data), environment.secretKey).toString();
  // }

  // // Desencripta cualquier tipo de dato
  // decrypt(data: any){
  //   const bytes  = CryptoJS.AES.decrypt(data, environment.secretKey);
  //   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  // }

}
