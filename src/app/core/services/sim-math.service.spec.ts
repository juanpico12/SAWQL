import { TestBed } from '@angular/core/testing';

import { SimMathService } from './sim-math.service';

describe('SimMathService', () => {
  let service: SimMathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimMathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
