import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDcaComponent } from './list-dca.component';

describe('ListDcaComponent', () => {
  let component: ListDcaComponent;
  let fixture: ComponentFixture<ListDcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
