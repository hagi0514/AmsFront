import { TestBed } from '@angular/core/testing';

import { CpoService } from './cpo.service';

describe('CpoService', () => {
  let service: CpoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
