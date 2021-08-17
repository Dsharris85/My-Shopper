import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyErrorComponent } from './empty-error.component';

describe('EmptyErrorComponent', () => {
  let component: EmptyErrorComponent;
  let fixture: ComponentFixture<EmptyErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
