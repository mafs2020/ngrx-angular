import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/interface';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

// tienes que traer el state que te interese
import { State, loadUsuariosSucces, paginacion } from '../state/pages.reduce';
import { Store } from '@ngrx/store';
import * as pagesActions from '../state/pages.actions';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  // USuarios: IUsuario[] = [];
  USuarios: Observable<IUsuario[]>;
  paginacion:number;
  constructor(
    private router: Router,
    private _usuarioServices :UsuarioServiceService,
    private store: Store<State>
    ) { }

  ngOnInit(): void {
    this.store.select( paginacion ).subscribe(pagina => this.paginacion = pagina);
    this.store.dispatch(pagesActions.loadUsuario({paginacion: this.paginacion}));
    this.USuarios = this.store.select(loadUsuariosSucces);
  }
  regresar() {
    this.router.navigate(['/login']);
  }
  enviar(id: number){
    this.router.navigate(['dashboard/usuario-detalle', id])
  }

  crear() {
    this.router.navigate(['dashboard/crear']);
  }

  cambirImagen(){
    this._usuarioServices.cambiarImagen();
  }

  siguientes(): void {
    this.paginacion += 1;
    this.store.dispatch(pagesActions.loadUsuario({paginacion: this.paginacion}));
  }

  anterior(): void {
    if(this.paginacion == 0){
      return;
    } else {
      this.paginacion -=1;
      this.store.dispatch( pagesActions.loadUsuario({ paginacion: this.paginacion }));
    }
  }

}
