import { TestBed } from '@angular/core/testing';

import { ProfesorListadoEstudiantesService } from './profesor-listado-estudiantes.service';

describe('ProfesorListadoEstudiantesService', () => {
  let service: ProfesorListadoEstudiantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesorListadoEstudiantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
