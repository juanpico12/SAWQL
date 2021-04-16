import { TestBed } from '@angular/core/testing';

import { SimPhService } from './sim-ph.service';

describe('SimPhService', () => {
  let service: SimPhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimPhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
