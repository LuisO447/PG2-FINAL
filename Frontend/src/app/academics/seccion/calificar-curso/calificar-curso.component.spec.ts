import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarCursoComponent } from './calificar-curso.component';

describe('CalificarCursoComponent', () => {
  let component: CalificarCursoComponent;
  let fixture: ComponentFixture<CalificarCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalificarCursoComponent]
    });
    fixture = TestBed.createComponent(CalificarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
