import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotifiacionUsuariosService {

  private apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient
  ){}
  
  public getNotifcicaciones() : any {
    return this.http.get( this.apiUrl + '/api/notificaciones', );
  }

  public postNotificacionLeida( data: any ) : any{
    return this.http.post( this.apiUrl + '/api/notificaciones/notificaciones_leidas', data);
  }

  public post(data: any) : any {
    return this.http.post( this.apiUrl + 'endpoint', data, );
  }

  public postMandarMensaje( data: any ){
    return this.http.post( this.apiUrl + '/api/notificaciones/crear_mensaje', data);
  }

}
