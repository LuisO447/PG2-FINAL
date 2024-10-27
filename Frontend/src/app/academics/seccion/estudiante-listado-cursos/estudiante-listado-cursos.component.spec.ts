import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteListadoCursosComponent } from './estudiante-listado-cursos.component';

describe('EstudianteListadoCursosComponent', () => {
  let component: EstudianteListadoCursosComponent;
  let fixture: ComponentFixture<EstudianteListadoCursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstudianteListadoCursosComponent]
    });
    fixture = TestBed.createComponent(EstudianteListadoCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
