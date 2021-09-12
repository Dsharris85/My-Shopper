import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealOrListPromptComponent } from './meal-or-list-prompt.component';

describe('MealOrListPromptComponent', () => {
  let component: MealOrListPromptComponent;
  let fixture: ComponentFixture<MealOrListPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealOrListPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealOrListPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
