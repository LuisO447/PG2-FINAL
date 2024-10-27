import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificacionesService } from 'src/app/services/funciones/notificaciones.service';
import { RecoveryService } from 'src/app/services/auth/recovery.service';


@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.css']
})
export class RestoreComponent implements OnInit {

  public restoreForm: FormGroup;

  public visiblePassword: boolean = false;

  public isButtonDisabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private notificacionesService: NotificacionesService,
    private recoveryService: RecoveryService 
  ){

    this.restoreForm = this.fb.group({
      token:            ['', [ Validators.required ] ],
      correo:           ['', [ Validators.required, Validators.email ] ],
      password:         ['', [ Validators.required, Validators.minLength( 6 ) ] ],
      confirmpassword:  ['', [ Validators.required, Validators.minLength( 6 ) ] ]
    });

  }

  ngOnInit(): void {
    const queryParams = this.activeRouter.snapshot.params;
    const paramtoken = queryParams['token'];
    this.restoreForm.patchValue( { ...this.restoreForm.value, token: paramtoken } );
  }

  //////////////////////////////////////////////////////////////////////////////////
  // funciones generales
    /**
     *
     *  
     * 
    */
    public restore(){

      if( this.restoreForm.valid ){

        this.isButtonDisabled = true;

        this.recoveryService.postRestore( this.restoreForm.value ).subscribe({
          next: ( response: any ) => { this.nextRecovery( response ) },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { this.isButtonDisabled = false; }
        })


      } else {
        this.notificacionesService.showError( 'Complete el formulario' );
        this.restoreForm.markAllAsTouched();
      }
      
    }

    public nextRecovery( response: any ){
     
      if( !response.valid ){

        this.notificacionesService.showError( response.message );
        return;

      }

      this.notificacionesService.showSuccess( response.message);
      this.router.navigate(['']);
      
    }


  //////////////////////////////////////////////////////////////////////////////////

   //////////////////////////////////////////////////////////////////////////////////
  // metodos de uso funcional estetico

      /**
       *
       * visualizar contraeña
       *  
      */
      public cambioVistaInput(){
        this.visiblePassword = !this.visiblePassword;
      }

  //////////////////////////////////////////////////////////////////////////////////




}
