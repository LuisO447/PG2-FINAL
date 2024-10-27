import { TestBed } from '@angular/core/testing';

import { ValidarSesionInterceptor } from './validar-sesion.interceptor';

describe('ValidarSesionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ValidarSesionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ValidarSesionInterceptor = TestBed.inject(ValidarSesionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
