import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsideMenuComponent } from './aside-menu/aside-menu.component';
import { ModalComponent } from '../components/modal/modal.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    AsideMenuComponent,
    ModalComponent,
    MenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AsideMenuComponent,
    ModalComponent,
    MenuComponent
  ]
})
export class SharedModule { }
