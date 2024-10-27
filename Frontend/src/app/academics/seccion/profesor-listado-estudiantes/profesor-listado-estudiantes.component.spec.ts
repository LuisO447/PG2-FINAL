import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorListadoEstudiantesComponent } from './profesor-listado-estudiantes.component';

describe('ProfesorListadoEstudiantesComponent', () => {
  let component: ProfesorListadoEstudiantesComponent;
  let fixture: ComponentFixture<ProfesorListadoEstudiantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfesorListadoEstudiantesComponent]
    });
    fixture = TestBed.createComponent(ProfesorListadoEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
