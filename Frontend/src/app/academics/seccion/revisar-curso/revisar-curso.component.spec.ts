import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarCursoComponent } from './revisar-curso.component';

describe('RevisarCursoComponent', () => {
  let component: RevisarCursoComponent;
  let fixture: ComponentFixture<RevisarCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisarCursoComponent]
    });
    fixture = TestBed.createComponent(RevisarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
