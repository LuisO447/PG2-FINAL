import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';;
import { ConfirmationService } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { NotificacionesService } from 'src/app/services/funciones/notificaciones.service';

import { AlmacenarService } from 'src/app/services/funciones/almacenar.service';
import { EstudianteListadoCursosService } from 'src/app/services/academics/estudiante-listado-cursos.service';

@Component({
  selector: 'app-estudiante-listado-cursos',
  templateUrl: './estudiante-listado-cursos.component.html',
  styleUrls: ['./estudiante-listado-cursos.component.css']
})
export class EstudianteListadoCursosComponent implements OnInit{

  @Output() cambioDeComponente = new EventEmitter<any>();

  @ViewChild('cm') cm!: ContextMenu;

  public items: MenuItem[] | undefined;

  public cursoAsignarForm: FormGroup;

  public datos: any = {};
  public selectCurso: any = {};

  public componenteActual: Number = 1;

  public visible: boolean = false;
  public isButtonDisabled: boolean = false;

  public banderaCargaDatos: boolean = false;

  public datosMostrar : any = { id: '', nombre: '', seccion: '', colegio: '', codigoCurso: ''};

  public listaCursosAsginados: any[] = [];

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private almacenarService: AlmacenarService,
    private notificacionesService: NotificacionesService,
    private estudianteListadoCursosService: EstudianteListadoCursosService 
  ){

    this.cursoAsignarForm = this.fb.group({
      user_id:    [ 0,            [  ] ],
      codigoCurso:     [ '',           [] ],
    });

  }

  ngOnInit(): void {

    // obtengo datos del usuario
    this.datos = this.almacenarService.getItem( 'user' );

    // los asigno al formulario
    this.cursoAsignarForm.patchValue( { ...this.cursoAsignarForm.value, user_id: this.datos.user_id } )

    this.items = [
      {
          label: 'Desasignar',
          icon: 'pi pi-trash',
          command: () => {
            this.confirmUnassignCurso( this.selectCurso );
          }
      }
    ];

    this.obtenerCursosAsignados();
    
  }

  //////////////////////////////////////////////////////////////////////////////////
  // metodos generales


    /**
     * 
     * 
    */
    public obtenerCursosAsignados(){

        this.banderaCargaDatos = true;

        this.estudianteListadoCursosService.get( ).subscribe({
          next: ( response: any ) => { this.nextObtenerCursosAsignados( response ); },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { this.banderaCargaDatos = false; }
        })

    }

    public nextObtenerCursosAsignados( response: any ){


      if( !response.valid ){

        this.notificacionesService.showError( response.message );
        return;

      }

      this.notificacionesService.showSuccess( response.message );
      this.listaCursosAsginados = response.data;

    }


    /**
     *
     * 
     *  
    */
      public asignacionCurso(){

        if (this.cursoAsignarForm.valid) {

          this.isButtonDisabled = true;

          this.estudianteListadoCursosService.post( this.cursoAsignarForm.value ).subscribe({
            next: ( response: any ) => { this.nextAsignacionCurso( response ); },
            error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
            complete: () => { this.isButtonDisabled = false; }
          })


        } else {
          this.notificacionesService.showError( "Error al completar el formulario" );
        }
        
      }

      public nextAsignacionCurso( response: any ){

        if( !response.valid ){

          this.notificacionesService.showError( response.message );
          return;

        }

        this.obtenerCursosAsignados();
        this.showOtherComponete( 1 );

      }

    /**
     * 
     * 
     * 
    */
    public unassingedCourse( curso: any ){

      let datos : any =  { estudiante: this.datos, curso };


      this.estudianteListadoCursosService.postDesasignar( datos ).subscribe({
        next: ( response: any ) => { this.nextUnassingedCourse( response ); },
        error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
        complete: () => {}
      })


    }

    public nextUnassingedCourse( response: any ){
      
      if( !response.valid ){

        this.notificacionesService.showError( response.message );
        return;
        
      }

      this.notificacionesService.showSuccess( response.message );
      this.obtenerCursosAsignados();

    }



  //////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////
  // metodos de funcion 

    /**
     * 
     * 
    */
      public showOtherComponete( bandera : number){
        this.cursoAsignarForm.reset();
        this.componenteActual = bandera;
      }

    /**
     * 
     * 
    */
      public showDialog( bandera: boolean) {
        this.visible = bandera;
        this.datosMostrar  = { id: '', nombre: '', seccion: '', colegio: '', codigoCurso: ''};
      }

    /**
     * 
     * 
    */
      public confirmUnassignCurso( curso: any) {

        this.confirmationService.confirm({
            message: '¿Seguro que desea proceder?',
            header: 'Cuadro de confirmación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Continuar',
            rejectLabel: 'Cancelar',
            accept: () => { this.unassingedCourse( curso ); },
            reject: ( type : any ) => {}
        });

      }
    
    /**
     *
     * 
     *  
    */
      public onContextMenu( event: any, curso_estudiante: any) {
        this.selectCurso = curso_estudiante;
        this.cm.show(event);
      }

    /**
     *
     * 
     *  
    */
      public onHide() {
          this.selectCurso = null;
      }
      
      public continuarCurso( cursoAsignado: any ){
        this.cambioDeComponente.emit( { nombre_compoennte: 'recibir_curso', tipo: cursoAsignado} );
      }



  //////////////////////////////////////////////////////////////////////////////////


}
