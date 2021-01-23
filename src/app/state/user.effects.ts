import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../state/user.actions';

import { catchError, exhaust, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private _userServices: UserService, private router: Router) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loginLoad),
      mergeMap(action => this._userServices.login(action.usuario).pipe(
        tap(token => console.log(token)),
        map(token => UserActions.loginLoadSucess({ token })),
        catchError(error => of(UserActions.loginLoadError({ error })))
      ))
    )
  });

  // sirve para redirigir cuando se loggie correctamente
  redirecionar$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(UserActions.loginLoadSucess),
        tap(() => this.router.navigate(['/dashboard'])))
  }, {dispatch: false});

}
