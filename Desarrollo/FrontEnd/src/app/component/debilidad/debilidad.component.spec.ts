import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebilidadComponent } from './debilidad.component';

describe('DebilidadComponent', () => {
  let component: DebilidadComponent;
  let fixture: ComponentFixture<DebilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
