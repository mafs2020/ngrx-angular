import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { IUsuario } from '../interfaces/interface';
import * as userActions from '../state/user.actions';

export interface UsersState {
    usuarioCurrent: IUsuario;
    usuarioSelect: IUsuario;
    token?: string;
    error: string;
}

const initialUser: UsersState = {
    usuarioCurrent: null,
    usuarioSelect: null,
    token: '',
    error: ''
};

const getUsersFeatureState = createFeatureSelector<UsersState>('usuarios');

export const usuarioCurrent = createSelector(
    getUsersFeatureState,
    state => state.usuarioCurrent
);

export const token = createSelector(
    getUsersFeatureState,
    state => state.token
);

export const usersReducer = createReducer<UsersState>(
    initialUser,
    on(userActions.loginLoad, (state, action): UsersState => ({
            ...state
        })),
    on(userActions.loginLoadSucess, (state, action): UsersState => {
        console.log('action :>> ', action);
        return {
            ...state,
            token: action.token
        };
    }),
    on(userActions.loginLoadError, (state, action): UsersState => ({
            ...state,
            error: action.error
        }))
);
