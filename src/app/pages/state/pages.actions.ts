import { createAction, props } from '@ngrx/store';
import { IPaginacion, IUsuario } from 'src/app/interfaces/interface';

export const loadUsuario = createAction(
    '[pages] Load',
    props<{ paginacion: number }>()
);

export const loadUsuariosSucces = createAction(
    '[pages] Load Succes',
    props<{ usuarios: IUsuario[] }>()
);

export const loadUsuarioError = createAction(
    '[pages] load Fail',
    props<{error: string}>()
);

export const paginacionCompleta = createAction(
    '[pages] Paginacion Completa',
    props<{ paginacionCompleta: IPaginacion}>()
);
