import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class CifrarService {

  
  private secretKey: string = 'ASDFAFFASDhthtthth77777F'; 

  protected diccionario: any = {
    user: 'U2FsdGVkX18WkB7sNIj',
    token: '2Fsd67Y6K72d65TomYzpeSGVkX18'

  }

  constructor(){}

  /**
   *
   * Método para hashear una contraseña
   *  
   * @param password 
   * @returns 
  */
    protected encript( text: string ): string {
      return CryptoJS.AES.encrypt( text, this.secretKey).toString();
    }

  /**
   * 
   * 
  */
  // Método para descifrar un texto
    protected decrypt(encryptedText: string): string {
      const bytes = CryptoJS.AES.decrypt( encryptedText, this.secretKey );
      return bytes.toString( CryptoJS.enc.Utf8 );
    }

}
