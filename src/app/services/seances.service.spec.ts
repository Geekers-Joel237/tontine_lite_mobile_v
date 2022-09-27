import { TestBed } from '@angular/core/testing';

import { SeancesService } from './seances.service';

describe('SeancesService', () => {
  let service: SeancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
