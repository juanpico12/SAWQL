import { TestBed } from '@angular/core/testing';

import { ExperimentDBService } from './experiment-db.service';

describe('ExperimentDBService', () => {
  let service: ExperimentDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperimentDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
