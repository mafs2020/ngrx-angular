import { createAction,props } from '@ngrx/store';
import { IUsuario } from '../interfaces/interface';

export const loginLoad = createAction(
    '[ USER ] load',
    props<{ usuario: IUsuario }>()
);

export const loginLoadSucess = createAction(
    '[ USER ] LOAD succes ',
    props<{ token: string }>()
);

export const loginLoadError = createAction(
    ' [ USER ] LOAD error ',
    props<{ error: string }>()
);