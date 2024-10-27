import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificacionesService } from 'src/app/services/funciones/notificaciones.service';

import { CalificarCursoService } from 'src/app/services/academics/curso/calificar-curso.service';

@Component({
  selector: 'app-revisar-curso',
  templateUrl: './revisar-curso.component.html',
  styleUrls: ['./revisar-curso.component.css']
})
export class RevisarCursoComponent implements OnInit {

  @Input() CursoEvaluacion: any = {};

  @Output() cambioDeComponente = new EventEmitter<string>();

  public evaluacionForm: FormGroup;

  public emisor: any = {};
  public notificacion: any = {};

  public listadoPreguntas: any[] = [];

  public isButtonDisabled: boolean = false;
  public banderaCargaDatos: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notificacionesService: NotificacionesService,
    private calificarCursoService: CalificarCursoService,
  ){

    this.evaluacionForm = this.fb.group({
      evaluacionId:  [ '',  [ Validators.required ] ],
      ponderacion: [ '', [ Validators.required ] ]
    });


  }

  ngOnInit(): void {

    this.emisor = this.CursoEvaluacion.tipo.emisor;
    this.notificacion = this.CursoEvaluacion.tipo.notificacion;

    this.evaluacionForm.patchValue( { ...this.evaluacionForm.value, evaluacionId: this.notificacion.evaluacionXEstudianteId })

    this.obtenerEvaluacion();

  }

  //////////////////////////////////////////////////////////////////////////////////
  // funcioens de comunicacion

      public obtenerEvaluacion(){

        let evaluacionId: string = this.notificacion.evaluacionXEstudianteId;

        this.banderaCargaDatos = true;

        this.calificarCursoService.getObtenerExamen( evaluacionId ).subscribe({
          next: ( response: any ) => { this.nextObtenerEvaluacion( response, evaluacionId ); },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { this.banderaCargaDatos = false;  }
        })

      }

      public nextObtenerEvaluacion( response: any, evaluacionId: string ){

        if( !response.valid ){

          this.notificacionesService.showError( response.message );
          return;

        }

        this.listadoPreguntas = response.data.cuestionarioEstudiante;

        this.evaluacionForm.patchValue( { evaluacionId: evaluacionId, ponderacion: response.data.ponderacion  });
        console.log(" form evaluacion ", this.evaluacionForm.value )

       }

       public ActualizarNota( ){

        this.isButtonDisabled = true;

        this.calificarCursoService.putActualizarNota( this.evaluacionForm.value ).subscribe({
          next: ( response: any ) => { this.getActualizarNota( response ); },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { this.isButtonDisabled = false; }
        })

       }

       public getActualizarNota( response : any ){

        if( !response.valid ){

          this.notificacionesService.showError( response.message );
          return;

        }

        this.notificacionesService.showSuccess( response. message );
        // this.cambioDeComponente.emit( 'dashboard' );


       }

  //////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////
  // funcioens de estetica
  //////////////////////////////////////////////////////////////////////////////////


}
