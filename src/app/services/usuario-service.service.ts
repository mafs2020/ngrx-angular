import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IModal, IPaginacion, IUsuario } from '../interfaces/interface';
import { Store } from '@ngrx/store';
import { State } from '../pages/state/pages.reduce';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  curretnUser: IUsuario;
  user: IUsuario;
  imagenBol = true;
  mostraModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  mostrarmodalnu = this.mostraModal.asObservable();

  imagen: BehaviorSubject<string> = new BehaviorSubject<string>('http://localhost:3000/sssss.png');
  imagenCambiar$ = this.imagen.asObservable();
  infoModal: Subject<IModal> = new Subject<IModal>();
  infoModal$ = this.infoModal.asObservable();
  constructor(private http: HttpClient, private store$: Store<State>) { }



  getAllUSers(pagina: number): Observable<IPaginacion> {
    return this.http.get<IPaginacion>(`http://localhost:3000/?pagina=${pagina}`)
    .pipe(
      catchError(err => this.handleError(err))
    );
  }

    crearUsuario(usuario: IUsuario): Observable<any>{
      return this.http.post('http://localhost:3000/', usuario).pipe(
        catchError(err => this.handleError(err))
      );
    }

    usuarioDetalle(id: number): Observable<IUsuario> {
      return this.http.get<IUsuario>(`http://localhost:3000/${id}`).pipe(
        catchError(err => this.handleError(err))
      );
    }
    // quite la U
    actualizarUsuario(id: number, usu: IUsuario): Observable<IUsuario> {
      return this.http.put<IUsuario>(`http://localhost:3000/${id}`, usu).pipe(
        catchError(err => this.handleError(err))
      );
    }

    eliminar(id: number): Observable<any> {
      return this.http.delete<any>(`http://localhost:3000/eliminar/${id}`).pipe(
        catchError(err => this.handleError(err))
      );
    }

    mostrarModalfuncion(data: IModal){
      this.mostraModal.next(true);
      this.infoModal.next(data);
    }

    cambiarImagen(): void {
      if(this.imagenBol){
        this.imagen.next('http://localhost:3000/ainz.png');
      } else {
        this.imagen.next('http://localhost:3000/sssss.png');
      }
      this.imagenBol = !this.imagenBol;
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
      this.infoModal.next({motivo: 'error', modalContent: errorMessage});
      // mostrar modal
      this.mostraModal.next(true);
      return throwError(errorMessage);
  }
}
