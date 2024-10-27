import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegisterService } from 'src/app/services/auth/register.service';
import { AlmacenarService } from 'src/app/services/funciones/almacenar.service';

import { NotificacionesService } from 'src/app/services/funciones/notificaciones.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  @Output() eventoCambioCard = new EventEmitter<number>();

  public registerForm: FormGroup;

  public tipoIngreso: string = '';
  public pasosIngreso: number = 1;

  public visiblePassword: boolean = false;

  public isButtonDisabled: boolean = false;

  /**
   * 
   * el form requiere
   * email
   * nombre
   * edad
   * sexo 
   * contrasena
  */ 
  // de la cuenta

  constructor(
    private  router: Router,
    private fb: FormBuilder,
    private notificacionesService: NotificacionesService,
    private registerService: RegisterService,
    private almacenarService: AlmacenarService
  ){

    this.registerForm = this.fb.group({
      tipo_usuario:      [ '',  [ Validators.required ] ],
      correo:            [ '',  [ Validators.required, Validators.email ] ] ,
      nombre_completo:   [ '',  [ Validators.required ] ],
      edad:              [ '',  [ Validators.required ] ],
      sexo:              [ 'm',  [ Validators.required ] ],
      contrasena:        [ '',  [ Validators.required, Validators.minLength( 6 ) ] ],
      cursos_asignados:  [ [], [] ],
      notificaciones:    [ [], [] ],
    });

  }

  ngOnInit(): void {

  }

 
  //////////////////////////////////////////////////////////////////////////////////

    /**
     *
     * 
     *  
    */
    public register(){ 
      
      if ( this.registerForm.valid) {

        this.isButtonDisabled= true;

        this.registerService.post( this.registerForm.value ).subscribe({
          next: ( response: any ) => { this.nextRegister( response ) },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { this.isButtonDisabled= false; }
        })


      } else {
        
      }
      
    }

    public nextRegister( response: any ){

      if( !response.valid ){

        this.notificacionesService.showError( response.message );
        return;
      }

      this.almacenarService.setItem( 'token', response.token );
      this.notificacionesService.showSuccess( response.message);
      this.router.navigate(['/academic'])

    }

  //////////////////////////////////////////////////////////////////////////////////



  //////////////////////////////////////////////////////////////////////////////////
  // metodos de uso funcional

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
       * cardModel es que formulario se debe redirigir
       *  
      */
      public changeCard( cardModel: number ){
        this.tipoIngreso = '';
        this.pasosIngreso = 1;
        this.registerForm.reset();
        this.eventoCambioCard.emit( cardModel );
      }

      /**
       * que tipo de formulario accedera
       * @param tipo 1 para profesor | 2 para estudiante
       */
      public ingresoPorTipo( tipo : string ){

        if( tipo == '' ){

          this.tipoIngreso = '';
          this.pasosIngreso = 1;

        }else{

          this.tipoIngreso = tipo;
          this.pasosIngreso = 2;

        }

        this.registerForm.patchValue( { ...this.registerForm.value, tipo_usuario: tipo } )

      }

  //////////////////////////////////////////////////////////////////////////////////

}
