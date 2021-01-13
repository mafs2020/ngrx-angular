import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../state/user.actions';

import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private _userServices: UserService) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loginLoad),
      mergeMap(action => this._userServices.login(action.usuario).pipe(
        tap(data => console.log(data)),
        map(resp => UserActions.loginLoadSucess({ token: resp })),
        catchError(error => of(UserActions.loginLoadError({ error })))
      ))
    )
  });

}
