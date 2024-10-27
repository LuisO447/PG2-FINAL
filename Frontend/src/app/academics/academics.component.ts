import { Component, OnInit, ViewChild } from '@angular/core';

import { Sidebar } from 'primeng/sidebar';

import { NotificacionesService } from '../services/funciones/notificaciones.service';

import { AlmacenarService } from 'src/app/services/funciones/almacenar.service';
import { LoginService } from '../services/auth/login.service';

import { NotifiacionUsuariosService } from '../services/academics/notifiacion-usuarios.service';

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.css']
})
export class AcademicsComponent implements OnInit {

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  public componenteActual: string = 'dashboard';

  public sidebarVisible: boolean = false;
  public cargandoNotificaciones: boolean  = false;

  public datosComponenteCurso: any = null;

  public NotificacioensTotales: string = '0';

  constructor(
    private notificacionesService: NotificacionesService,
    private loginService: LoginService,
    private almacenarService: AlmacenarService,
    private notifiacionUsuariosService: NotifiacionUsuariosService
  ){}

  public listadoNotificaciones: any[] = [];
  public listadoTodasNotificaciones: any[] = [];

  ngOnInit(): void {
    this.obtenerDatos();
  }


  //////////////////////////////////////////////////////////////////////
  // funciones generales

    /**
     *
     * obtener datos del usuario y notificaciones
     *  
    */
    public obtenerDatos(){

      this.loginService.getDatosGenerles( ).subscribe({
        next: ( response: any ) => { this.nextGetDatos( response ); },
        error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
        complete: () => {}
      })

    }

    public nextGetDatos( response: any ){

      if( !response.valid ){
        this.notificacionesService.showError( response.message );
        return;

      }

      this.almacenarService.setItem( 'user', response.user );
      this.NotificacioensTotales = response.user.notificaciones?.length?.toString() ?? '0';

    }

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
        this.listadoNotificaciones = [];
        return;
      }

      this.listadoTodasNotificaciones = response.notifcaciones;
      this.listadoNotificaciones = response.notifcaciones.filter( ( notificacion : any ) => notificacion.notificacion.leido == false );

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
        this.listadoNotificaciones = [];
        return;
      }

    }

    public marcarTodasNotificaciones(){
      this.listadoNotificaciones.map( ( notificacion: any) => this.NotifacioensLeida( notificacion.id )  );
    }
    

  
  //////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////
  // funciones esteticas

      public agregarTodasLasnotificaiones(){
        this.listadoNotificaciones = this.listadoTodasNotificaciones;
      }

      public limpiarNotificaciones(){
        this.listadoNotificaciones = [];
      }
      
      public toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
      }

      public CambioComponentePadre( nombreComponente: any ){
        
        this.obtenerDatos();
        this.componenteActual = ( typeof nombreComponente == 'string' ) ? nombreComponente : nombreComponente.nombre_compoennte;
        this.datosComponenteCurso = ( typeof nombreComponente == 'object' ) ? nombreComponente : null;
        this.sidebarVisible = false;

      }

      public closeCallback( e : any ) {
          this.sidebarRef.close( e );
      }

      public evaluarCurso( notificacion: any ){

        if( notificacion.notificacion.tipoNotificacion == 'Mensaje'){
          return;
        }

        let objeto: any = { nombre_compoennte: 'evaluar_curso', tipo: notificacion} ;
        this.CambioComponentePadre( objeto );

      }

  //////////////////////////////////////////////////////////////////////

}
