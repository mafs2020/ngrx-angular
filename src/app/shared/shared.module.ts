import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsideMenuComponent } from './aside-menu/aside-menu.component';
import { ModalComponent } from '../components/modal/modal.component';


@NgModule({
  declarations: [
    AsideMenuComponent,
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AsideMenuComponent,
    ModalComponent
  ]
})
export class SharedModule { }
