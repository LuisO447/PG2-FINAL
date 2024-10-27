import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient
  ){}
  

  public postObtenerContenidoCurso(data: any) : any {
    return this.http.post( this.apiUrl + '/api/cursos/contenido_curso', data, );
  }
  
}
