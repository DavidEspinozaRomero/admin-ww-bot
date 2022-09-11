import { Injectable } from '@angular/core';

import { CryptService } from './';
import { LocalStorageKey } from '../interfaces/storage.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private readonly crypt: CryptService) {}

  setLocalStorage(key: LocalStorageKey, data: any) {
    const DATA = JSON.stringify(data);
    localStorage.setItem(key, DATA);
  }
  getLocalStorage(key: LocalStorageKey) {
    return localStorage.getItem(key);
  }
  removeLocalStorage(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }
}
