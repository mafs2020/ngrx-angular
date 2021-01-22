import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboarComponent } from './dashboar/dashboar.component';
import { InicioComponent } from './inicio/inicio.component';
import { RUTASPAGESMODULE } from './pages.routes';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';

// ngrx
import { StoreModule } from '@ngrx/store';
import { pagesReducer } from './state/pages.reduce';
import { EffectsModule } from '@ngrx/effects';
import { PagesEffects } from './state/pages.effects';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboarComponent,
    InicioComponent,
    UsuarioDetalleComponent,
    CrearUsuarioComponent
  ],
  imports: [
    CommonModule,
    RUTASPAGESMODULE,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('pages', pagesReducer),
    EffectsModule.forFeature([PagesEffects]),
    // RouterModule
  ]
})
export class PagesModule { }
