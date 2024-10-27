import { TestBed } from '@angular/core/testing';

import { ProfesorAdminCursosService } from './profesor-admin-cursos.service';

describe('ProfesorAdminCursosService', () => {
  let service: ProfesorAdminCursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesorAdminCursosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
