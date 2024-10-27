import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient
  ){}
  

  public post(data: any) : any {
    return this.http.post( this.apiUrl + '/login', data, );
  }

  public getDatosGenerles(): any{
    return this.http.get( this.apiUrl +'/api/users/ping');
  }

}
