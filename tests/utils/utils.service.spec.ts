import { TestBed } from '@angular/core/testing';

import { UtilsService } from '../../src/app/utils/utils.service';

//#region mocks

const mockfg = {
  controls: {
    password: {
      touched: false,
      errors: false,
    },
    name: {
      touched: true,
      errors: true,
    },
  },
};
//#endregion mocks

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be a function', () => {
    expect(typeof service.isValidControl).toBe('function');
  });

  it('should return a boolean', () => {
    expect(typeof service.isValidControl(mockfg, 'password')).toBe('boolean');
  });
  it('should return a false', () => {
    expect(service.isValidControl(mockfg, 'password')).toBe(false);
  });

  it('should return a true', () => {
    expect(service.isValidControl(mockfg, 'name')).toBe(true);
  });
});
