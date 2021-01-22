import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { IUsuario } from '../interfaces/interface';
import * as userActions from '../state/user.actions';

export interface UsersState {
    usuarioCurrent: IUsuario;
    usuarioSelect: IUsuario;
    token: string;
    error: string;
}

const initialUser: UsersState = {
    usuarioCurrent: null,
    usuarioSelect: null,
    token: '',
    error: ''
};


const getUsersFeatureState = createFeatureSelector<UsersState>('users');


export const usuarioCurrent = createSelector(
    getUsersFeatureState,
    state => state.usuarioCurrent
);

export const usersReducer = createReducer<UsersState>(
    initialUser,
    on(userActions.loginLoad, (state, action): UsersState => {
        console.log('state :>> ', state);
        console.log('action :>> ', action);
        return {
            ...state
        }
    }),
    on(userActions.loginLoadSucess, (state, action): UsersState => {
        return {
            ...state,
            token: action.token
        }
    }),
    on(userActions.loginLoadError, (state, action): UsersState => {
        return {
            ...state,
            error: action.error
        }
    })
);