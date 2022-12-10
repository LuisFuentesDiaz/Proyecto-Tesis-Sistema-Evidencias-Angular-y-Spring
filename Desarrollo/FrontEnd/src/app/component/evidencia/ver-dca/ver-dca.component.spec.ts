import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDcaComponent } from './ver-dca.component';

describe('VerDcaComponent', () => {
  let component: VerDcaComponent;
  let fixture: ComponentFixture<VerDcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
