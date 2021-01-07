import { Injectable } from "@angular/core";

import * as PagesActions from './pages.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UsuarioServiceService } from "src/app/services/usuario-service.service";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable() 
export class PagesEffects {
    constructor(private actions$: Actions, private _usuarioServices: UsuarioServiceService) {}

    loadUsuarios$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PagesActions.loadUsuario),
            mergeMap(action => this._usuarioServices.getAllUSers(action.paginacion).pipe(
                map(usuarios => PagesActions.loadUsuariosSucces({ usuarios })),
                catchError(error => of(PagesActions.loadUsuarioError({ error })))
            ))
        )
    })
}