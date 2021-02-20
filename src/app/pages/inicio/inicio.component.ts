import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/interface';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

// tienes que traer el state que te interese
import { State, loadUsuariosSucces, paginacion, paginacionCompleta } from '../state/pages.reduce';
import { Store } from '@ngrx/store';
import * as pagesActions from '../state/pages.actions';
import { usuarioCurrent } from 'src/app/state/user.reduce';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit, OnDestroy {
  // USuarios: IUsuario[] = [];
  usuarios: IUsuario[];
  paginacion: number;
  total: number;

  constructor(
    private router: Router,
    private usuarioServices: UsuarioServiceService,
    private store: Store<State>
    ) { }

  ngOnInit(): void {
    this.store.select( paginacion ).subscribe(pagina => this.paginacion = pagina);
    // this.store.select( usuarioCurrent ).subscribe(data => console.log(data));
    this.store.dispatch(pagesActions.loadUsuario({paginacion: this.paginacion}));
    this.store.select(paginacionCompleta).subscribe(resp => {
      this.total = resp.total;
      this.usuarios = resp.rows;
    });
    // console.log(this.a);
  }
  regresar() {
    this.router.navigate(['/login']);
  }
  enviar(id: number){
    this.router.navigate(['dashboard/usuario-detalle', id]);
  }

  crear() {
    this.router.navigate(['dashboard/crear']);
  }

  cambirImagen(){
    this.usuarioServices.cambiarImagen();
  }

  siguientes(): void {
    if( this.paginacion < (this.total -1) ) {
      this.paginacion += 1;
      this.store.dispatch(pagesActions.loadUsuario({paginacion: this.paginacion}));
    };
  }

  anterior(): void {
    if(this.paginacion === 0){
      return;
    } else {
      this.paginacion -=1;
      this.store.dispatch( pagesActions.loadUsuario({ paginacion: this.paginacion }));
    }
  }

  ngOnDestroy(): void {

  }

}
