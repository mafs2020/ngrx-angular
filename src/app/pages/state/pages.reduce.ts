import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as PagesActions from './pages.actions';

import { IUsuario } from '../../interfaces/interface';

import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
    pages: PageState;
}

export interface PageState {
    paginacion: number;
    usuarios: IUsuario[];
    error: string;
}

const initialStatePage: PageState = {
    paginacion: 0,
    usuarios: [],
    error: ''
};


const getPagesFeatureState = createFeatureSelector<PageState>('pages');

export const paginacion = createSelector(
    getPagesFeatureState,
    state => state.paginacion
);

export const getUsuarios = createSelector(
    getPagesFeatureState,
    state => state.usuarios
);

export const loadUsuariosSucces = createSelector(
    getPagesFeatureState,
    state => state.usuarios
)

export const getError = createSelector(
    getPagesFeatureState,
    state => state.error
);

export const pagesReducer = createReducer<PageState>(
    initialStatePage,
    on(PagesActions.loadUsuario, (state, action): PageState => {
        return {
            ...state,
            usuarios: [],
            paginacion: action.paginacion
        };
    }),
    on(PagesActions.loadUsuariosSucces, (state, action): PageState => {
        console.group('loadUsuariosSucces');
        console.log('action :>> ', action);
        console.log('state :>> ', state);
        console.groupEnd();
        return {
            ...state,
            usuarios: action.usuarios,
            error: ''
        }
    }),
    on(PagesActions.loadUsuarioError, (state, action): PageState => {
        return {
            ...state,
            usuarios: [],
            error: action.error
        }
    }),
    // state: -> es el estado de la app lo que tienes
    // action: -> es la informacion que estas mandando por ende la info que vas a actualizar al state
);