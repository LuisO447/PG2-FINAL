import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler,HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AlmacenarService } from '../services/funciones/almacenar.service';

@Injectable()
export class ValidarSesionInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private almacenarService: AlmacenarService
  ){

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      return next.handle( request ).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.almacenarService.clear();
          this.router.navigate(['/']);
        }
        return throwError(error);
      })
    );
  }
}
