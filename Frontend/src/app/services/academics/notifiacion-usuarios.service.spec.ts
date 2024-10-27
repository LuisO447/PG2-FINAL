import { TestBed } from '@angular/core/testing';

import { NotifiacionUsuariosService } from './notifiacion-usuarios.service';

describe('NotifiacionUsuariosService', () => {
  let service: NotifiacionUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifiacionUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
