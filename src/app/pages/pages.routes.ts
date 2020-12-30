import { RouterModule, Routes } from "@angular/router";

import { DashboarComponent } from "./dashboar/dashboar.component";

import { InicioComponent } from "./inicio/inicio.component";
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';
import { CrearUsuarioComponent } from "./crear-usuario/crear-usuario.component";

const rutashijopages: Routes = [
    {
        path: '',
        component: DashboarComponent,
        children: [
            {
                path: '',
                component: InicioComponent
            },
            {
                path: 'crear',
                component: CrearUsuarioComponent
            },
            {
                path: 'usuario-detalle/:id',
                component: UsuarioDetalleComponent
            }
        ]
    }
];


export const RUTASPAGESMODULE = RouterModule.forChild(rutashijopages);