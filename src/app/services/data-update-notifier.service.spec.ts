import { TestBed } from '@angular/core/testing';

import { DataUpdateNotifierService } from './data-update-notifier.service';

describe('DataUpdateNotifierService', () => {
  let service: DataUpdateNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataUpdateNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
