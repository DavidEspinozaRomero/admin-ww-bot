import { TestBed } from '@angular/core/testing';

import { ErrHandlerInterceptor } from './err-handler.interceptor';

describe('ErrHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrHandlerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrHandlerInterceptor = TestBed.inject(ErrHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
