import { TestBed } from '@angular/core/testing';

import { AmbitoGeograficoService } from './ambito-geografico.service';

describe('AmbitoGeograficoService', () => {
  let service: AmbitoGeograficoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmbitoGeograficoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
