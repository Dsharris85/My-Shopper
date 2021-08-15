import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsTabComponent } from './lists-tab.component';

describe('ListsTabComponent', () => {
  let component: ListsTabComponent;
  let fixture: ComponentFixture<ListsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
