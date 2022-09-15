import { TestBed } from '@angular/core/testing';

import { TontinesService } from './tontines.service';

describe('TontinesService', () => {
  let service: TontinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TontinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
