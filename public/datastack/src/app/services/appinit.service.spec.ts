import { TestBed } from '@angular/core/testing';

import { AppinitService } from './appinit.service';

describe('AppinitService', () => {
  let service: AppinitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppinitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
