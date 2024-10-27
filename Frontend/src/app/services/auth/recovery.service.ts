import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecoveryService {
 
  private apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient
  ){}
  

  public postRecovery(data: any) : any {
    return this.http.post( this.apiUrl + '/api/users/recovery', data );
  }

  public postRestore( data: any ) : any {
    return this.http.post( this.apiUrl + '/api/users/restore', data )
  }

}
