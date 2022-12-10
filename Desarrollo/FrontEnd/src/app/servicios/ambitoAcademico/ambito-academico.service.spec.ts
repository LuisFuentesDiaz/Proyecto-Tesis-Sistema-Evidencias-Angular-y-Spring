import { TestBed } from '@angular/core/testing';

import { AmbitoAcademicoService } from './ambito-academico.service';

describe('AmbitoAcademicoService', () => {
  let service: AmbitoAcademicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmbitoAcademicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
