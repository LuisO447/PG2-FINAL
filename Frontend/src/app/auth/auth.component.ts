import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  public currentSide: number = 0;

  constructor(){}

  public actualizarCard( event: number ){
    this.currentSide  = event ?? 0;
  }

}
