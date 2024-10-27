import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RecoveryService } from 'src/app/services/auth/recovery.service';
import { NotificacionesService } from 'src/app/services/funciones/notificaciones.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  @Output() eventoCambioCard = new EventEmitter<number>();

  public recoveryForm: FormGroup;

  public isButtonDisabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notificacionesService: NotificacionesService,
    private recoveryService: RecoveryService 
  ){

    this.recoveryForm = this.fb.group({
      tipo_usuario:       [ 'profesor', [ Validators.required ] ],
      correo:             [ '',         [ Validators.required, Validators.email ] ],
    });


  }

  ngOnInit(): void {}

  //////////////////////////////////////////////////////////////////////////////////
  // funcioens de comunicacion

    /**
     *
     *  
    */
    public recovery(){  

       if ( this.recoveryForm.valid ){

        this.isButtonDisabled = true;

        this.recoveryService.postRecovery( this.recoveryForm.value ).subscribe({
          next: ( response: any ) => { this.nextRecovery( response ) },
          error: ( error: any ) => { this.notificacionesService.showError( error.error.message ); },
          complete: () => { this.isButtonDisabled = false; }
        })


      } else {

        this.notificacionesService.showError( 'Complete el formulario') 
        this.recoveryForm.markAllAsTouched();
      }
      
    }

    public nextRecovery( response: any ){

      if( !response.valid){
        this.notificacionesService.showError( response.message );
        return;
      }

      this.notificacionesService.showSuccess( response.message );

    }

  //////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////
  // metodos de uso funcional estetico

    /**
     * 
     * cambio de vista para ver otro formulario
     * 
     * @param cardModel 
    */
    public changeCard( cardModel: number ){
      this.recoveryForm.reset();
      this.eventoCambioCard.emit( cardModel );
    }

  //////////////////////////////////////////////////////////////////////////////////

  

}
