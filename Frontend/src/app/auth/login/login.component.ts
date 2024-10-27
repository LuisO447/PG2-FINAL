import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificacionesService } from 'src/app/services/funciones/notificaciones.service';

import { AlmacenarService } from 'src/app/services/funciones/almacenar.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() eventoCambioCard = new EventEmitter<number>();

  public loginForm: FormGroup;

  public visiblePassword: boolean = false;

  public tipoIngreso: string = '';
  public pasosIngreso: number = 1;

  public isButtonDisabled: boolean = false;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private notificacionesService: NotificacionesService,
    private almacenarService: AlmacenarService,
    private loginService: LoginService
  ){

    this.loginForm = this.fb.group({
      tipo_usuario:  [ '',  [ Validators.required ] ],
      correo:        [ '', [ Validators.required, Validators.email ] ],
      contrasena:    [ '', [ Validators.required, Validators.minLength( 6 ) ] ]
    });

  }

  //////////////////////////////////////////////////////////////////////////////////
  // funciones generales

    /**
     * 
     * 
    */
    public login(){
      
      if (this.loginForm.valid) {

        this.isButtonDisabled = true;

        this.loginService.post( this.loginForm.value ).subscribe({
          next: ( response: any ) => { this.nextLogin( response ); },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { this.isButtonDisabled = false; }
        })


      } else {
          this.notificacionesService.showError( 'Complete el formulario' ) 
          this.loginForm.markAllAsTouched();
      }
    }

    public nextLogin( response: any ){

      if( !response.valid ){

        this.notificacionesService.showError( response.message);
        return;
        
      }

      this.almacenarService.setItem( 'token', response.token );
      this.notificacionesService.showSuccess( response.message);
      this.router.navigate(['academic']);

    }
  //////////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////////
  // metodos de uso funcional estetico

      /**
       * cambio de vista para ver otro formulario
       *  
       * @param cardModel 
      */
      public changeCard( cardModel: number ){
        this.tipoIngreso = '';
        this.pasosIngreso = 1;
        this.loginForm.reset();
        this.eventoCambioCard.emit( cardModel );
      }

      /**
       *
       * visualizar contraeña
       *  
      */
      public cambioVistaInput(){
        this.visiblePassword = !this.visiblePassword;
      }

      /**
       * 
       * @param tipo 1 para profesor | 2 para estudiante
      */
      public ingresoPorTipo( tipo : string){

        if( tipo == '' ){
          this.tipoIngreso = '';
          this.pasosIngreso = 1;
        } else {
          this.tipoIngreso = tipo;
          this.pasosIngreso = 2;
        }

        
        this.loginForm.patchValue( { ...this.loginForm.value, tipo_usuario: tipo } )

      }

  //////////////////////////////////////////////////////////////////////////////////


}
