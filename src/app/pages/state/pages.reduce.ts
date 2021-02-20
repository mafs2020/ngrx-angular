import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as PagesActions from './pages.actions';

import { IPaginacion, IUsuario } from '../../interfaces/interface';

import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
    pages: PageState;
}

export interface PageState {
    paginacion: number;
    usuarios: IUsuario[];
    error: string;
    paginacionCompleta: IPaginacion;
}

const initialStatePage: PageState = {
    paginacion: 0,
    usuarios: [],
    error: '',
    paginacionCompleta: { url: '', next: true, prev: '', rows: [], count: 0, total:0 }
};


const getPagesFeatureState = createFeatureSelector<PageState>('pages');

export const paginacion = createSelector(
    getPagesFeatureState,
    state => state.paginacion
);


export const paginacionCompleta = createSelector(
    getPagesFeatureState,
    state => state.paginacionCompleta
);

export const getUsuarios = createSelector(
    getPagesFeatureState,
    state => state.usuarios
);

export const loadUsuariosSucces = createSelector(
    getPagesFeatureState,
    state => state.usuarios
);

export const getError = createSelector(
    getPagesFeatureState,
    state => state.error
);

export const pagesReducer = createReducer<PageState>(
    initialStatePage,
    on(PagesActions.loadUsuario, (state, action): PageState => ({
            ...state,
            usuarios: [],
            paginacion: action.paginacion
        })),
    on(PagesActions.loadUsuariosSucces, (state, action): PageState => {
        console.group('loadUsuariosSucces');
        console.log('action :>> ', action);
        console.log('state :>> ', state);
        console.groupEnd();
        return {
            ...state,
            usuarios: action.usuarios,
            error: ''
        };
    }),
    on(PagesActions.loadUsuarioError, (state, action): PageState => ({
            ...state,
            usuarios: [],
            error: action.error
        })),
    on(PagesActions.paginacionCompleta, (state, action): PageState => {
        console.log(action);
        return {
            ...state,
            paginacionCompleta: action.paginacionCompleta
        };
    }),
    // state: -> es el estado de la app lo que tienes
    // action: -> es la informacion que estas mandando por ende la info que vas a actualizar al state
);
