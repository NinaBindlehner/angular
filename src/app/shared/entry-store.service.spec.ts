import { TestBed } from '@angular/core/testing';

import { EntryStoreService } from './entry-store.service';

describe('EntryStoreService', () => {
  let service: EntryStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
