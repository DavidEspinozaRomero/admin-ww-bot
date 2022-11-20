import { TestBed } from '@angular/core/testing';

import { ToastBaseService } from './toast.service';

describe('ToastBaseService', () => {
  let service: ToastBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
