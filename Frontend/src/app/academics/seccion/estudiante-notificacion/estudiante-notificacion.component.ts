import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificacionesService } from 'src/app/services/funciones/notificaciones.service';
import { NotifiacionUsuariosService } from 'src/app/services/academics/notifiacion-usuarios.service';

@Component({
  selector: 'app-estudiante-notificacion',
  templateUrl: './estudiante-notificacion.component.html',
  styleUrls: ['./estudiante-notificacion.component.css']
})
export class EstudianteNotificacionComponent implements OnInit {


  public cargandoNotificaciones: boolean = false;

  public listaNotificiacones: any[] = [];

  public mensajeNotificacionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificacionesService: NotificacionesService,
    private notifiacionUsuariosService: NotifiacionUsuariosService
  ){

    this.mensajeNotificacionForm = this.fb.group({
      correoReceptor: [ '', [ Validators.required, Validators.email ] ],
      contenido:      [ '', [ Validators.required ] ]
    });


  }

  ngOnInit(): void {
      this.obtenerNotifacioens();
  }
  
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // funciones generales

        /**
         *
         *  
        */
 

      public obtenerNotifacioens( ){
      
        this.cargandoNotificaciones = true;
  
        this.notifiacionUsuariosService.getNotifcicaciones( ).subscribe({
          next: ( response: any ) => { this.nextObtenerNotifacioens( response ); },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { this.cargandoNotificaciones = false; }
        })
        
      }
  
      public nextObtenerNotifacioens( response : any ){
  
        if( !response.valid ){
          this.notificacionesService.showError( response.message );
          this.listaNotificiacones = [];
          return;
        }
  
        this.listaNotificiacones = response.notifcaciones;
  
      }

      public NotifacioensLeida( notificacion_id: any ){
      
        this.cargandoNotificaciones = true;
  
        let datos = {
          notificacion_id
        }
  
        this.notifiacionUsuariosService.postNotificacionLeida( datos ).subscribe({
          next: ( response: any ) => { this.nextObtenerNotifacioens( response ); },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { this.cargandoNotificaciones = false; this.obtenerNotifacioens() }
        })
        
      }
  
      public nextNotifacioensLeida( response : any ){
  
        if( !response.valid ){
          this.notificacionesService.showError( response.message );
          this.listaNotificiacones = [];
          return;
        }
  
      }

      public mandarMensaje(){

        this.notifiacionUsuariosService.postMandarMensaje( this.mensajeNotificacionForm.value ).subscribe({
          next: ( response: any ) => { this.nextMandarMensaje( response ); },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { }
        })

      }

      public nextMandarMensaje( response : any ){

        if( !response.valid ){
          this.notificacionesService.showError( response.message );
          return;
        }

        this.notificacionesService.showSuccess( response.message );
        this.mensajeNotificacionForm.reset();


      }

  

    //////////////////////////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // funciones esteticas
    //////////////////////////////////////////////////////////////////////////////////////////////////////

}
