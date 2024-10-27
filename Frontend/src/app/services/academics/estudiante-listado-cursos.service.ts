import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EstudianteListadoCursosService {

  private apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient
  ){}
  
  public get() : any {
    return this.http.get( this.apiUrl + '/api/cursos/curso_asignados' );
  }

  public post(data: any) : any {
    return this.http.post( this.apiUrl + '/api/cursos/asignar', data, );
  }

  public postDesasignar(data: any) : any {
    return this.http.post( this.apiUrl + '/api/cursos/desasignar', data, );
  }
  
}
