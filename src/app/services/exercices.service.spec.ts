import { TestBed } from '@angular/core/testing';

import { ExercicesService } from './exercices.service';

describe('ExercicesService', () => {
  let service: ExercicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
