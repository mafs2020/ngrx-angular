import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUsuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  constructor(private http: HttpClient) { }

  getAllUSers$ = this.http.get<IUsuario[]>('http://localhost:3000/')
    .pipe(
      catchError(err => {
        return this.handleError(err)
      })
    );

    usuarioDetalle(id: Number): Observable<IUsuario> {
      return this.http.get<IUsuario>(`http://localhost:3000/${id}`).pipe(
        catchError(err => {
          return this.handleError(err)
        })
      );
    }

    Uactualizarusuario(id: number, usu: IUsuario): Observable<IUsuario> {
      console.log(usu);
      return this.http.put<IUsuario>(`http://localhost:3000/${id}`, usu).pipe(
        catchError(err => {
          return this.handleError(err)
        })
      );
    }

    private handleError(err: any): Observable<never> {
      // in a real world app, we may send the server to some remote logging infrastructure
      // instead of just logging it to the console
      console.log(err);
      let errorMessage: string;
      if (err.error) {
        // A client-side or network error occurred. Handle it accordingly.
        // errorMessage = `a ocurrido un error: ${err.error.message}`;
        // errorMessage = `a ocurrido un error: ${err.message}`;
        errorMessage = `a ocurrido un error: ${err.error.msj}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `backend codigo ${err.status}:`;
      }
      return throwError(errorMessage);
    }
}
