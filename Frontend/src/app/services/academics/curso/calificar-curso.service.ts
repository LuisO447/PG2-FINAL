import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalificarCursoService {

  private apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient
  ){}
  

  public getObtenerExamen( evaluacion: string ){
    return this.http.get( this.apiUrl + '/api/evaluaciones_estudiante/' + evaluacion,  )
  }

  public putActualizarNota( data: any ){
    return this.http.put( this.apiUrl + '/api/evaluaciones_estudiante', data,  )
  }

  public postEntregarExamen(data: any) : any {
    return this.http.post( this.apiUrl + '/api/evaluaciones_estudiante', data, );
  }

}
