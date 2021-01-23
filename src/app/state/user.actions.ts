import { createAction,props } from '@ngrx/store';
import { IUsuario } from '../interfaces/interface';

export const loginLoad = createAction(
    '[ USER ] load User',
    props<{ usuario: IUsuario }>()
);

export const loginLoadSucess = createAction(
    '[ USER ] LOAD User succes ',
    props<{ token: string }>()
);

export const loginLoadError = createAction(
    ' [ USER ] LOAD User error ',
    props<{ error: string }>()
);