import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboarComponent } from './dashboar/dashboar.component';
import { InicioComponent } from './inicio/inicio.component';
import { RUTASPAGESMODULE } from './pages.routes';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';

@NgModule({
  declarations: [
    DashboarComponent,
    InicioComponent,
    UsuarioDetalleComponent
  ],
  imports: [
    CommonModule,
    RUTASPAGESMODULE,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
