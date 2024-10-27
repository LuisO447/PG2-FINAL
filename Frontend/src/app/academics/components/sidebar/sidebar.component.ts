import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AlmacenarService } from 'src/app/services/funciones/almacenar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  @Output() cambioDeComponente = new EventEmitter<string>();

  public datos: any = {};
  public open: boolean = false;

  public NotificacioensTotales: string = '0';
  constructor(
    private router: Router,
    private almacenarService: AlmacenarService
  ){}

  ngOnInit(): void {

    this.datos = this.almacenarService.getItem( 'user' );
    this.NotificacioensTotales = this.datos.notificaciones?.length?.toString();
    
  }

  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////////
  // funciones generales

    public setOpen( bandera: boolean){
      this.open = bandera;
    }

    public cambioComponente( modulo: string){
      this.cambioDeComponente.emit( modulo );
    }

    public logOut( ){
      this.almacenarService.clear();
      this.router.navigate( [ '' ] );
    }

  //////////////////////////////////////////////////////////////////////////////////
  

}
