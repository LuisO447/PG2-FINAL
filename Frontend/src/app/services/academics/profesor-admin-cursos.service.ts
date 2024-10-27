import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesorAdminCursosService {

  private apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient
  ){}
  

  public get() : any {
    return this.http.get( this.apiUrl + '/api/cursos', );
  }

  public postCrearCurso( id: string, data: any) : any {
    return this.http.post( this.apiUrl + '/api/cursos', data );
  }

  public putEditarCurso( id: string, data: any) : any {
    return this.http.put( this.apiUrl + '/api/cursos/' + id, data );
  }

  public deleteCurso( id: string ) : any {
    return this.http.delete( this.apiUrl + '/api/cursos/' + id );
  }
  
   public bloquearEstudiante(codigoCurso: string, correoEstudiante: string) : any {
    const data = { codigoCurso, correoEstudiante };
    return this.http.post(this.apiUrl + '/api/cursos/bloquear', data);
  }

  public desbloquearEstudiante(codigoCurso: string, correoEstudiante: string) : any {
    const data = { codigoCurso, correoEstudiante };
    return this.http.post(this.apiUrl + '/api/cursos/desbloquear', data);
  }

  public listarBloqueadosPorCurso(cursoId: string) : any {
    return this.http.get(this.apiUrl + '/api/cursos/listado_bloqueados_x_curso', { params: { cursoId } });
  }
}
