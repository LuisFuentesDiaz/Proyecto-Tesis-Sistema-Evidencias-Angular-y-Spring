import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResponsableComponent } from './list-responsable.component';

describe('ListResponsableComponent', () => {
  let component: ListResponsableComponent;
  let fixture: ComponentFixture<ListResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListResponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
