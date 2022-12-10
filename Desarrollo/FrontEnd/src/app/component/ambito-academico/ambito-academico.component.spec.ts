import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbitoAcademicoComponent } from './ambito-academico.component';

describe('AmbitoAcademicoComponent', () => {
  let component: AmbitoAcademicoComponent;
  let fixture: ComponentFixture<AmbitoAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbitoAcademicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbitoAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
