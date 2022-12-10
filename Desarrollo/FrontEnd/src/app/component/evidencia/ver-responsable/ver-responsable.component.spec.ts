import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerResponsableComponent } from './ver-responsable.component';

describe('VerResponsableComponent', () => {
  let component: VerResponsableComponent;
  let fixture: ComponentFixture<VerResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerResponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
