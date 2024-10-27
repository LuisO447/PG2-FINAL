import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorNotificacionesComponent } from './profesor-notificaciones.component';

describe('ProfesorNotificacionesComponent', () => {
  let component: ProfesorNotificacionesComponent;
  let fixture: ComponentFixture<ProfesorNotificacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfesorNotificacionesComponent]
    });
    fixture = TestBed.createComponent(ProfesorNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
