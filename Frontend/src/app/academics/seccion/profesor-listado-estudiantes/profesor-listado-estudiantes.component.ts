import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';

import { NotificacionesService } from 'src/app/services/funciones/notificaciones.service';
import { ProfesorListadoEstudiantesService } from 'src/app/services/academics/profesor-listado-estudiantes.service';



@Component({
  selector: 'app-profesor-listado-estudiantes',
  templateUrl: './profesor-listado-estudiantes.component.html',
  styleUrls: ['./profesor-listado-estudiantes.component.css']
})
export class ProfesorListadoEstudiantesComponent implements OnInit {

  @ViewChild('cm') cm!: ContextMenu;

  public items: MenuItem[] | undefined;

  public selectCursoEstudiante: any = {};

  public listaEstudiantesCursos: any[] = [];
  public listaEstudiantesCursosFiltrada: any[] = [];
  public filtroEstudiante: string = '';
  public filtroCurso: string = '';


  public banderaCargaDatos: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private notificacionesService: NotificacionesService,
    private profesorListadoEstudiantesService: ProfesorListadoEstudiantesService 
  ){}

  ngOnInit(): void {

    this.items = [
      {
          label: 'Desasignar',
          icon: 'pi pi-trash',
          command: () => {
            this.confirmDelete( this.selectCursoEstudiante );
          }
      }
    ];

    this.obtenerEstudiantesXCurso();
    
  }

  //////////////////////////////////////////////////////////////////////////////////
  // funcioens de comunicacion

    /**
     *
     *  
    */
      public obtenerEstudiantesXCurso( ){  

        this.banderaCargaDatos = true;

        this.profesorListadoEstudiantesService.getListadoEsutdiantePorCurso( ).subscribe({
          next: ( response: any ) => { this.nextGetListadoEsutdiantePorCurso( response ); },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { this.banderaCargaDatos = false; }
        })


      }

      public nextGetListadoEsutdiantePorCurso( response: any ){

        if ( !response.valid ){
          this.notificacionesService.showError( response.message );
          return;
        }
      
        this.listaEstudiantesCursos = response.data;


      }

      public darDeBajaEstudiante( de_baja_curso_estudiante: any ){  
      
        this.profesorListadoEstudiantesService.postDeBajaEstudiante( de_baja_curso_estudiante ).subscribe({
          next: ( response: any ) => { this.nextDarDeBajaEstudiante( response ); },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => {}
        })


      }

      public nextDarDeBajaEstudiante( response: any ){

        if ( !response.valid ){

          this.notificacionesService.showError( response.message );
          return;

        }

    
        this.notificacionesService.showSuccess( response.message );
        this.obtenerEstudiantesXCurso();
        

      }


 //////////////////////////////////////////////////////////////////////////////////

   //////////////////////////////////////////////////////////////////////////////////////////////////////
   // funciones generales

      /**
       * 
       * 
       * 
      */
      public filtrar() {
        const filtroEstudianteLower = this.filtroEstudiante.toLowerCase();
        const filtroCursoLower = this.filtroCurso.toLowerCase();

        this.listaEstudiantesCursosFiltrada = this.listaEstudiantesCursos.filter(estudianteCurso =>
          estudianteCurso.estudiante.nombre_completo.toLowerCase().includes(filtroEstudianteLower) &&
          estudianteCurso.curso.nombre?.toLowerCase().includes(filtroCursoLower)
        );
      }

      /**
      * 
      * levantar un dialog de confimacion antes de eliminar al estudiante
      * 
      */
        public confirmDelete( de_baja_curso_estudiante: any ){
         
          this.confirmationService.confirm({
              message: '¿Seguro que desea proceder?',
              header: 'Cuadro de confirmación',
              icon: 'pi pi-exclamation-triangle',
              acceptLabel: 'Continuar',
              rejectLabel: 'Cancelar',
              accept: () => { this.darDeBajaEstudiante( de_baja_curso_estudiante ); },
              reject: ( type : any ) => {}
          });

        }

          
      /**
       *
       * 
       *  
      */
        public onContextMenu( event: any, curso_estudiante: any) {
          this.selectCursoEstudiante = curso_estudiante;
          this.cm.show(event);
        }

      /**
       *
       * 
       *  
      */
        public onHide() {
            this.selectCursoEstudiante = null;
        }


   //////////////////////////////////////////////////////////////////////////////////////////////////////
}
