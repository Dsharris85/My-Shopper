import { TestBed } from '@angular/core/testing';

import { FoodAutocompleteService } from './food-autocomplete.service';

describe('FoodAutocompleteService', () => {
  let service: FoodAutocompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodAutocompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
