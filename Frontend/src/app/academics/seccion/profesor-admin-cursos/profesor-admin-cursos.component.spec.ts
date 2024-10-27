import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorAdminCursosComponent } from './profesor-admin-cursos.component';

describe('ProfesorAdminCursosComponent', () => {
  let component: ProfesorAdminCursosComponent;
  let fixture: ComponentFixture<ProfesorAdminCursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfesorAdminCursosComponent]
    });
    fixture = TestBed.createComponent(ProfesorAdminCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
