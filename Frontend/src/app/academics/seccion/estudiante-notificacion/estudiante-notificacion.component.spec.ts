import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteNotificacionComponent } from './estudiante-notificacion.component';

describe('EstudianteNotificacionComponent', () => {
  let component: EstudianteNotificacionComponent;
  let fixture: ComponentFixture<EstudianteNotificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstudianteNotificacionComponent]
    });
    fixture = TestBed.createComponent(EstudianteNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
