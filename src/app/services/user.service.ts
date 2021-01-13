import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IUsuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
    ) { }

  login(usuario: IUsuario): Observable<any> {
    console.log('object');
    return this.http.post<any>('http://localhost:3000/', usuario)
        .pipe(
          catchError(err => this.handleError(err))
        )
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.log('este es el error', err);
    let errorMessage: string;
    
    if (err?.message) {
      // A client-side or network error occurred. Handle it accordingly.
      // errorMessage = `a ocurrido un error: ${err.error.message}`;
      // errorMessage = `a ocurrido un error: ${err.message}`;
      errorMessage = `ocurrio un problema al intentar borrar al usuario intentar mas tarde`;
    } else {
      errorMessage = `Ocurrido un: ${err.error?.msj}`;
      console.log('entro al else');
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
    }
    if(!!err?.error?.msj){
      errorMessage = err?.error?.msj;
    }
    // info modal
    // this.infoModal.next({motivo: 'error', modalContent: errorMessage});
    // mostrar modal
    // this.mostraModal.next(true);
    return throwError(errorMessage);
  }
}