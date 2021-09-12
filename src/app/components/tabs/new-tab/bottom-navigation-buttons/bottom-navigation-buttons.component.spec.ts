import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavigationButtonsComponent } from './bottom-navigation-buttons.component';

describe('BottomNavigationButtonsComponent', () => {
  let component: BottomNavigationButtonsComponent;
  let fixture: ComponentFixture<BottomNavigationButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomNavigationButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomNavigationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
