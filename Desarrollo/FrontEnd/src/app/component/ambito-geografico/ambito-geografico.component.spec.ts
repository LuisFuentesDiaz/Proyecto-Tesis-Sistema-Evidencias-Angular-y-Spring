import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbitoGeograficoComponent } from './ambito-geografico.component';

describe('AmbitoGeograficoComponent', () => {
  let component: AmbitoGeograficoComponent;
  let fixture: ComponentFixture<AmbitoGeograficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbitoGeograficoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbitoGeograficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
