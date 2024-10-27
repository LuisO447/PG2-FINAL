import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {

  constructor(
    private messageService: MessageService,
  ){}

  public showSuccess( mensaje: string = 'Inconveniente con el servidor'){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: mensaje });
  }

  public showInfo( mensaje: string = 'Inconveniente con el servidor'){
      this.messageService.add({ severity: 'info', summary: 'Info', detail: mensaje });
  }

  public showWarn( mensaje: string = 'Inconveniente con el servidor'){
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: mensaje });
  }

  public showError( mensaje: string = 'Inconveniente con el servidor'){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: mensaje });
  }

  public showContrast( mensaje: string = 'Inconveniente con el servidor'){
      this.messageService.add({ severity: 'contrast', summary: 'Error', detail: mensaje });
  }

  public showSecondary( mensaje: string = 'Inconveniente con el servidor'){
      this.messageService.add({ severity: 'secondary', summary: 'Secondary', detail: mensaje });
  }


}
