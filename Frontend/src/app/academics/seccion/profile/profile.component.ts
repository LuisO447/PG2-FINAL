import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlmacenarService } from 'src/app/services/funciones/almacenar.service';
import { ProfileService } from 'src/app/services/academics/profile.service';

import { NotificacionesService } from 'src/app/services/funciones/notificaciones.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Output() cambioDeComponente = new EventEmitter<string>();

  public profileForm: FormGroup;
  public profileRestablecerPasswordForm: FormGroup;

  public datos: any = {};

  public visiblePassword: boolean = false;

  public isButtonDisabled: boolean = false;
  public isButtonDisabledPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private almacenarService: AlmacenarService,
    private notificacionesService: NotificacionesService,
    private profileService: ProfileService 
  ){

    this.profileForm = this.fb.group({
      usuario:          [ 1,   [ Validators.required ] ],
      tipo_usuario:     [ '',  [ Validators.required ] ],
      correo:           [ '',  [ Validators.required, Validators.email ] ] ,
      nombre_completo:  [ '',  [ Validators.required ] ],
      edad:             [ 0,   [ Validators.required ] ],
      sexo:             [ 'm',  [ Validators.required ] ],
    });

    this.profileRestablecerPasswordForm = this.fb.group({
      usuario:              [ 1,   [ Validators.required ] ],
      contrasena:           [ '',  [ Validators.required, Validators.minLength( 6 ) ] ] ,
      nuevo_contrasena:     [ '',  [ Validators.required, Validators.minLength( 6 ) ] ] ,
      confirmar_contrasena: [ '',  [ Validators.required, Validators.minLength( 6 ) ] ] ,
    });
    
  }

  ngOnInit(): void {

    this.datos = this.almacenarService.getItem( 'user' );

    this.profileForm.patchValue({
      usuario         : this.datos.usuario ?? '1',
      tipo_usuario    : this.datos.tipo_usuario ?? '',
      correo          : this.datos.correo ?? '',
      nombre_completo : this.datos.nombre_completo ?? '',
      edad            : this.datos.edad ?? 'm',
      sexo            : this.datos.sexo ?? '',
      contrasena      : ''
    })

    if( this.datos.tipo_usuario == 'estudiante' ){
      this.profileForm.get('edad')?.disable();
    }

    
  }

  //////////////////////////////////////////////////////////////////////////////////
  // metodos generales

  /**
   * 
  */
    public profileUpdate(){

      if (this.profileForm.valid) {

        this.isButtonDisabled = true;

        this.profileService.putUpdateData( this.profileForm.value ).subscribe({
          next: ( response: any ) => { this.nextProfile( response ); },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { this.isButtonDisabled = false; }
        })


      } else {
        this.notificacionesService.showError( "Completar los campos" );
      }
      
    }

    public nextProfile( response: any ){

      if( !response.valid ){

        this.notificacionesService.showError( response.message );
        return;

      }

      this.notificacionesService.showSuccess( response.message );
      this.cambioComonente('dashboard')


    }

    /**
     * 
    */
      public updatePassword(){

        if( this.profileRestablecerPasswordForm.valid ){

          this.isButtonDisabledPassword = true;

          this.profileService.putUpdatePassword( this.profileRestablecerPasswordForm.value ).subscribe({
            next: ( response: any ) => { this.nextProfile( response ); },
            error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
            complete: () => { this.isButtonDisabledPassword = false; }
          })
  
  
        } else {
          this.notificacionesService.showError( "Verfificar los errores" );
        }
        

      }

  //////////////////////////////////////////////////////////////////////////////////
  

  //////////////////////////////////////////////////////////////////////////////////
  // metodos de funcion estetica

  /**
   * 
  */
    public cambioVistaInput(){
      this.visiblePassword = !this.visiblePassword;
    }


  /**
   * 
   * @param modulo 
  */
    public cambioComonente( modulo: string ){
      this.cambioDeComponente.emit( modulo );
    }

  //////////////////////////////////////////////////////////////////////////////////


}
