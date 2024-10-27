import { Component, Input, OnInit, AfterViewInit, AfterViewChecked, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

import { NotificacionesService } from 'src/app/services/funciones/notificaciones.service';
import { CalificarCursoService } from 'src/app/services/academics/curso/calificar-curso.service';

import SignaturePad from 'signature_pad';


@Component({
  selector: 'app-calificar-curso',
  templateUrl: './calificar-curso.component.html',
  styleUrls: ['./calificar-curso.component.css']
})
export class CalificarCursoComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Output() ActualizarLeccionContenido = new EventEmitter<Boolean>();

  @Input() test: any  = {};
  @Input() curso: any  = {};

  @ViewChild('signatureCanvas', { static: false }) signatureCanvas!: ElementRef<HTMLCanvasElement>;

  signaturePad!: SignaturePad;
  signatureImage: string | null = null;


  // Declaración del contador y arreglo de respuestas
  public puntaje: number = 0;
  public respuestasSeleccionadas: any[] = [];

  public isButtonDisabled: boolean = false;

  public ponderacionPorPregunta: number = 0;

  constructor(
    private notificacionesService: NotificacionesService,
    private calificarCursoService: CalificarCursoService
  ){}

  ngAfterViewInit(){

    if (this.signatureCanvas) {
      const canvas = this.signatureCanvas.nativeElement;
      this.signaturePad = new SignaturePad(canvas);
    } else {
      console.error('Canvas element not found!');
    }

  }

  ngAfterViewChecked() {
    if (!this.signaturePad && this.signatureCanvas) {
      const canvas = this.signatureCanvas.nativeElement;
      this.signaturePad = new SignaturePad(canvas);
    }
  }

  ngOnInit(): void {

    console.log("test mimi cuestionario ", this.test.cuestionario.length);
    this.ponderacionPorPregunta = 100 / this.test.cuestionario.length;

    console.log("ponderacion por pregunta ", this.ponderacionPorPregunta);


  }

  //////////////////////////////////////////////////////////////////////////////////
  // funcioens de comunicacion

    /**
     *
     *  
    */
      public enviaExamen(){

        let objeto : any = {}

        objeto = {
          curso: this.curso,
          evaluacion: { evaluacionId: this.test.id, enlaceResultado: '', cuestionarioEstudiante: this.respuestasSeleccionadas , ponderacion: this.puntaje }
        }

        this.isButtonDisabled = true;

        this.calificarCursoService.postEntregarExamen( objeto ).subscribe({
          next: ( response: any ) => { this.nextEnviaExamen( response ); },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { this.isButtonDisabled = false; }
        })

      }

      public nextEnviaExamen( response: any ){

        if( !response.valid ){

          this.notificacionesService.showError( response.message );
          return;

        }

        if( response.aprobado ){
          this.notificacionesService.showSuccess( response.aprobadoMensaje );
          this.ActualizarLeccionContenido.emit( response.aprobado );
        }else{
          this.notificacionesService.showError( response.aprobadoMensaje );
        }



       }

  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  // funcioenes estetica 

    /**
     * 
     * @param pregunta  objeto genreal
     * @param opcion  que se;alo 
    */
      public responderPregunta(pregunta: any, opcion: any) {
      
        const respuestaExistente = this.respuestasSeleccionadas.find( (r) => r.pregunta.pregunta === pregunta.pregunta );
      
        if (respuestaExistente) {
          
          if (respuestaExistente.opcion.correcta !== opcion.correcta) {
            this.puntaje += opcion.correcta ? this.ponderacionPorPregunta : -(this.ponderacionPorPregunta);
            respuestaExistente.opcion = opcion;
          }

        } else {
          
          if (opcion.correcta) {
            this.puntaje += this.ponderacionPorPregunta;
          }
      
          
          this.respuestasSeleccionadas.push({
            pregunta: pregunta,
            opcion: opcion
          });
        }

        console.log(" Pregunta ", pregunta)
        console.log(" opcion ", opcion)
        console.log(" puntaje ", this.puntaje)
      
        // Mostramos el puntaje actualizado
        
      }

    /////////////////////////////////////


    // Método para limpiar el canvas
      clearSignature() {
        this.signaturePad.clear();
      }

    // Método para guardar el dibujo como una imagen en base64
      saveSignature() {
        if (this.signaturePad.isEmpty()) {
          alert('No se ha dibujado nada.');
        } else {
          this.signatureImage = this.signaturePad.toDataURL();
        }
      }

  //////////////////////////////////////////////////////////////////////////////////



}
