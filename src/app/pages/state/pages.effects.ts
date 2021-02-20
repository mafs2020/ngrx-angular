/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';

import * as PagesActions from './pages.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PagesEffects {
    constructor(private actions$: Actions, private _usuarioServices: UsuarioServiceService) {}

    loadUsuarios$ = createEffect(() => this.actions$.pipe(
            ofType(PagesActions.loadUsuario),
            // eslint-disable-next-line no-underscore-dangle
            mergeMap(action => this._usuarioServices.getAllUSers(action.paginacion).pipe(
                tap(data => console.log('data resp :>> ', data)),
                map(resp => PagesActions.paginacionCompleta({ paginacionCompleta: resp })),
                catchError(error => of(PagesActions.loadUsuarioError({ error })))
            ))
        ));
}
