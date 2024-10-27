import { TestBed } from '@angular/core/testing';

import { CifrarService } from './cifrar.service';

describe('CifrarService', () => {
  let service: CifrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CifrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
