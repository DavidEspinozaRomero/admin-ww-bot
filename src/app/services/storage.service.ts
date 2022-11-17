import { Injectable } from '@angular/core';

import { CryptService } from '.';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private readonly crypt: CryptService) {}

  setLocalStorage(key: LocalStorageKey, data: string) {
    // const DATA = JSON.stringify(data);
    localStorage.setItem(key, data);
  }
  getLocalStorage(key: LocalStorageKey) {
    return localStorage.getItem(key);
  }
  removeLocalStorage(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }
}

export const enum LocalStorageKey {
  token = 'token',
  user = 'user',
}