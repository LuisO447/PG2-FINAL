import { Injectable } from '@angular/core';

import { CifrarService } from './cifrar.service';

@Injectable({
  providedIn: 'root'
})
export class AlmacenarService extends CifrarService {

  private super(){}

   /**
    * 
    * @param key 
    * @param value 
  */
   setItem(key: string, value: any): void {

    const encryptedValue = super.encript( JSON.stringify(value) );

    localStorage.setItem( this.diccionario[ key ] , encryptedValue );
    
  }

  /**
   * Método para recuperar un valor de localStorage y descifrarlo
   * @param key 
   * @returns 
  */
    getItem(key: string): any {

      const encryptedValue = localStorage.getItem( this.diccionario[ key ] );

      if (encryptedValue) {
        const decryptedValue = super.decrypt( encryptedValue );
        return JSON.parse( decryptedValue );
      }

      return null;
    }

  /**
   * Método para remover un ítem de localStorage
   * @param key 
   * 
  */
    removeItem( key: string ): void {
      localStorage.removeItem( this.diccionario[ key ] );
    }

  /**
   * Método para limpiar todo el localStorage 
  */
    clear(): void {
      localStorage.clear();
    }


}
