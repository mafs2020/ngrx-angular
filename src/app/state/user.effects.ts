import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../state/user.actions';

import { catchError, exhaust, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private userServices: UserService, private router: Router) { }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  login$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.loginLoad),
      mergeMap(action => this.userServices.login(action.usuario).pipe(
        map(token => UserActions.loginLoadSucess({ token })),
        catchError(error => of(UserActions.loginLoadError({ error })))
      ))
    ));

  // sirve para redirigir cuando se loggie correctamente
  // eslint-disable-next-line @typescript-eslint/member-ordering
  redirecionar$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.loginLoadSucess),
        tap(({ token }) => console.log(token)),
        tap((action) => this.router.navigate(['/dashboard']))), {dispatch: false});

}
