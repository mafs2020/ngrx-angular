import { RouterModule, Routes } from "@angular/router";

import { DashboarComponent } from "./dashboar/dashboar.component";
import { InicioComponent } from "./inicio/inicio.component";
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';

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
                path: 'usuario-detalle/:id',
                component: UsuarioDetalleComponent
            }
        ]
    }
];


export const RUTASPAGESMODULE = RouterModule.forChild(rutashijopages);