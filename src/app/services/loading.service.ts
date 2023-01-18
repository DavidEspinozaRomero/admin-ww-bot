import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading: EventEmitter<boolean> = new EventEmitter();
  constructor() {}
}
