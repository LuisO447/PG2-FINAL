import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { PrimengModule } from '../primeng/primeng.module';

import { AcademicsComponent } from './academics.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { DashboardComponent } from './seccion/dashboard/dashboard.component';
import { ProfileComponent } from './seccion/profile/profile.component';
import { ProfesorAdminCursosComponent } from './seccion/profesor-admin-cursos/profesor-admin-cursos.component';
import { ProfesorListadoEstudiantesComponent } from './seccion/profesor-listado-estudiantes/profesor-listado-estudiantes.component';
import { ProfesorNotificacionesComponent } from './seccion/profesor-notificaciones/profesor-notificaciones.component';
import { EstudianteListadoCursosComponent } from './seccion/estudiante-listado-cursos/estudiante-listado-cursos.component';
import { EstudianteNotificacionComponent } from './seccion/estudiante-notificacion/estudiante-notificacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CursoComponent } from './seccion/curso/curso.component';
import { CalificarCursoComponent } from './seccion/calificar-curso/calificar-curso.component';
import { RevisarCursoComponent } from './seccion/revisar-curso/revisar-curso.component';


const academicRoute: Routes = [
  { path: '', component: AcademicsComponent  },
]

@NgModule({
  declarations: [
    AcademicsComponent,
    SidebarComponent,
    DashboardComponent,
    ProfileComponent,
    ProfesorAdminCursosComponent,
    ProfesorListadoEstudiantesComponent,
    ProfesorNotificacionesComponent,
    EstudianteListadoCursosComponent,
    EstudianteNotificacionComponent,
    CursoComponent,
    CalificarCursoComponent,
    RevisarCursoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild( academicRoute ),
    PrimengModule
  ],
  exports:[
    RouterModule
  ]
})
export class AcademicsModule { }
