import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsTabComponent } from './meals-tab.component';

describe('MealsTabComponent', () => {
  let component: MealsTabComponent;
  let fixture: ComponentFixture<MealsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
