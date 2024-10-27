import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient
  ){}
  

  public putUpdateData(data: any) : any {
    return this.http.put( this.apiUrl + '/api/users/update_data', data, );
  }

  public putUpdatePassword(data: any) : any {
    return this.http.put( this.apiUrl + '/api/users/update_password', data, );
  }

}
