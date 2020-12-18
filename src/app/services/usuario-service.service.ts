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

    private handleError(err: any): Observable<never> {
      // in a real world app, we may send the server to some remote logging infrastructure
      // instead of just logging it to the console
      let errorMessage: string;
      if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
      }
      console.info(err);
      return throwError(errorMessage);
    }
}
