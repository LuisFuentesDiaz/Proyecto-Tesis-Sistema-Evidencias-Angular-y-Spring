import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDirectorUnidadComponent } from './list-director-unidad.component';

describe('ListDirectorUnidadComponent', () => {
  let component: ListDirectorUnidadComponent;
  let fixture: ComponentFixture<ListDirectorUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDirectorUnidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDirectorUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
