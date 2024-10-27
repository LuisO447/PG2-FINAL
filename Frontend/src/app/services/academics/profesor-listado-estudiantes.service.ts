import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfesorListadoEstudiantesService {

  private apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient
  ){}
  

  public getListadoEsutdiantePorCurso(){
    return this.http.get( this.apiUrl + '/api/cursos/listado_estudiantes_cursos')
  }

  public postDeBajaEstudiante(data: any) : any {
    return this.http.post( this.apiUrl + '/api/cursos/desasignar', data, );
  }
  
}
