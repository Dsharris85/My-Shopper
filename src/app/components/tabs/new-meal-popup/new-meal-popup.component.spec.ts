import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMealPopupComponent } from './new-meal-popup.component';

describe('NewMealPopupComponent', () => {
  let component: NewMealPopupComponent;
  let fixture: ComponentFixture<NewMealPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMealPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMealPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
