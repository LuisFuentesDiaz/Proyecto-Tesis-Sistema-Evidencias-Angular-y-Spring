import { TestBed } from '@angular/core/testing';

import { DebilidadService } from './debilidad.service';

describe('DebilidadService', () => {
  let service: DebilidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebilidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
