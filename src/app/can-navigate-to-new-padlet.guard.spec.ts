import { TestBed } from '@angular/core/testing';

import { CanNavigateToNewPadletGuard } from './can-navigate-to-new-padlet.guard';

describe('CanNavigateToNewPadletGuard', () => {
  let guard: CanNavigateToNewPadletGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanNavigateToNewPadletGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
