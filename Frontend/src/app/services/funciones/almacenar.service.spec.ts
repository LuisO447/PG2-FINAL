import { TestBed } from '@angular/core/testing';

import { AlmacenarService } from './almacenar.service';

describe('AlmacenarService', () => {
  let service: AlmacenarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmacenarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
