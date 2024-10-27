import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfirmationService } from 'primeng/api';

import { NotificacionesService } from 'src/app/services/funciones/notificaciones.service';
import { ProfesorAdminCursosService } from 'src/app/services/academics/profesor-admin-cursos.service';

@Component({
  selector: 'app-profesor-admin-cursos',
  templateUrl: './profesor-admin-cursos.component.html',
  styleUrls: ['./profesor-admin-cursos.component.css']
})
export class ProfesorAdminCursosComponent implements OnInit {

  public cursoForm: FormGroup;
  public correoEstudiante: string = '';
  public showValidationError: boolean = false;
  public bloqueados: any[] = [];
  public codigoCurso: string = '';
  public cursoId: string = '';

  public componenteActual: boolean = true;
  public visible: boolean = false;

  public editarCurso: boolean = false;

  public isButtonDisabled: boolean = false;
  public isButtonDisabledEliminar: boolean = false;

  public banderaCargaDatos: boolean = false;

  public datosMostrar : any = { id: '', nombre: '', seccion: '', escuela: '', codigoCurso: ''};

  public secciones: any[] = [
    { name: 'A', code: 'A' },
    { name: 'B', code: 'B' },
    { name: 'Única', code: 'Única' },
  ];

  public listaCursos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private notificacionesService: NotificacionesService,
    private profesorAdminCursosService: ProfesorAdminCursosService
  ){

    this.cursoForm = this.fb.group({
      id:         [ '0',           [] ],
      nombre:     [ '',           [ Validators.required ] ],
      seccion:    [ '',           [ Validators.required ] ],
      escuela:    [ '',           [ Validators.required ] ],
      tipoCurso:   [ 'ortografia', [ ] ],
      codigoCurso: [ '',           [] ],
      estudiantes: [ [], [] ],
      lecciones:   [ [], [] ]
    });

  }

  ngOnInit(): void {
    this.getCursos();
  }

  //////////////////////////////////////////////////////////////////////////////////
  // metodos generales

    /**
     * 
     * 
     * 
    */

      public getCursos(){

        this.banderaCargaDatos = true;

        this.profesorAdminCursosService.get().subscribe({
          next: ( response: any ) => { this.nextGetCursos( response ); },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { this.banderaCargaDatos = false; }
        })

      }
   
      public nextGetCursos( response: any ){

        if( !response.valid ){

          this.notificacionesService.showError( response.message );
          this.listaCursos = [];
          return;
        }

        this.listaCursos = response.data;

      }

    public bloquearEstudiante() {
      if (this.codigoCurso && this.correoEstudiante) {
        this.profesorAdminCursosService.bloquearEstudiante(this.codigoCurso, this.correoEstudiante).subscribe({
          next: (response: any) => { this.notificacionesService.showSuccess(response.message); this.listarBloqueados(); },
          error: (error: any) => { this.notificacionesService.showError(error.error.message); }
        });
      }
    }

    public desbloquearEstudiante(correo: string) {
      this.profesorAdminCursosService.desbloquearEstudiante(this.codigoCurso, correo).subscribe({
        next: (response: any) => { this.notificacionesService.showSuccess(response.message); this.listarBloqueados(); },
        error: (error: any) => { this.notificacionesService.showError(error.error.message); }
      });
    }

    public listarBloqueados() {
      if (this.cursoId) {
        this.profesorAdminCursosService.listarBloqueadosPorCurso(this.cursoId).subscribe({
          next: (response: any) => {
            if (response.valid) {
              this.bloqueados = response.data;
            } else {
              this.notificacionesService.showError(response.message);
            }
          },
          error: (error: any) => { 
            this.notificacionesService.showError(error.error.message); 
          }
        });
      }
    }

    validarYBloquearEstudiante() {
      const correo = this.correoEstudiante;
    
      const correoValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
      if (!correo || correo.trim() === '') {
        this.showValidationError = true;
        return;
      }
    
      if (!correoValido.test(correo)) {
        this.showValidationError = true;
        return;
      }
      this.showValidationError = false;
      this.bloquearEstudiante();
    }

    /**
     * 
    */
    public cursoModify(){

      let metodoSolicitudMap = {
        postCrearCurso: this.profesorAdminCursosService.postCrearCurso.bind(this.profesorAdminCursosService),
        putEditarCurso: this.profesorAdminCursosService.putEditarCurso.bind(this.profesorAdminCursosService)
      };
      
      let metodoSolicitud: (id: string, data: any) => any = metodoSolicitudMap[this.editarCurso ? "putEditarCurso" : "postCrearCurso"];
      let idCurso: string = this.editarCurso ? this.cursoForm.value.id : '0';


      if (this.cursoForm.valid) {

        this.isButtonDisabled = true;

        metodoSolicitud( idCurso, this.cursoForm.value ).subscribe({
          next: ( response: any ) => { this.nextCursoModify( response ) },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { this.isButtonDisabled = false; }
        })


      } else {
        this.notificacionesService.showError( "Error al completar el formulario" );
      }

    }

    public nextCursoModify( response: any){

      if( !response.valid ){
        this.notificacionesService.showError( response.message ); 
        return;
      }

      this.showOtherComponete( true );
      this.getCursos();


    }

    /**
     * 
     * 
     * 
    */
    public eliminarCurso( curso: any ){

      this.isButtonDisabledEliminar = true;

      this.profesorAdminCursosService.deleteCurso( curso.id ).subscribe({
        next: ( response: any ) => { this.nextEliminarCurso( response ) },
        error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
        complete: () => { this.isButtonDisabledEliminar = false; }
      })

    }

    public nextEliminarCurso( response: any ){

      if( !response.valid ){
        this.notificacionesService.showError( response.message ); 
        return;
      }

      this.notificacionesService.showSuccess( response.message ); 
      this.getCursos();

    }

  //////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////
  // metodos de funcion 

    /**
     * 
     *
     *  
    */
      public asignarDatos( curso: any){
        this.cursoId = curso.id;
        this.codigoCurso = curso.codigoCurso;
        this.datosMostrar = curso;
        this.visible = true;
        this.listarBloqueados();
      }

    /**
     * 
     * 
    */
      public asignarDatosEdicion( curso: any ){
        console.log("curso ", curso);
        this.cursoId = curso.id;
        this.codigoCurso = curso.codigoCurso;
        this.componenteActual = false;
        this.cursoForm.patchValue( curso );
        this.editarCurso = true;
        this.listarBloqueados();
      }

    /**
     * 
     * 
    */
      public showOtherComponete( bandera : boolean){
        this.cursoForm.reset();
        this.cursoForm.patchValue( { ...this.cursoForm.value, tipoCurso: 'ortografia' })
        this.componenteActual = bandera;
        this.editarCurso = false;
      }

    /**
     * 
     * 
    */
      public showDialog( bandera: boolean) {
        this.visible = bandera;
        this.datosMostrar  = { id: '', nombre: '', seccion: '', escuela: '', codigoCurso: ''};
      }

    /**
     * 
     * 
    */
      public confirmDelete( curso: any) {

        this.confirmationService.confirm({
            message: '¿Seguro que desea proceder?',
            header: 'Cuadro de confirmación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Continuar',
            rejectLabel: 'Cancelar',
            accept: () => { this.eliminarCurso( curso ); },
            reject: ( type : any ) => {}
        });

      }

  //////////////////////////////////////////////////////////////////////////////////


}
