import { TestBed } from '@angular/core/testing';

import { EstudianteListadoCursosService } from './estudiante-listado-cursos.service';

describe('EstudianteListadoCursosService', () => {
  let service: EstudianteListadoCursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudianteListadoCursosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
