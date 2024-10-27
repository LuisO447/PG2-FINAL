import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AlmacenarService } from 'src/app/services/funciones/almacenar.service';


@Injectable()
export class ModifyHeaderInterceptor implements HttpInterceptor {

  constructor(
    private almacenarService: AlmacenarService,
  ){}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     // Obtener el token del servicio de autenticación
     const token = this.almacenarService.getItem( 'token' );

     // Clonar la solicitud y agregar el encabezado de autorización si existe un token
     const authReq = token ? request.clone( { setHeaders: { Authorization: `Bearer ${token}`} } ) : request;
 
     // Continuar con la solicitud
     return next.handle(authReq);
   }

}
