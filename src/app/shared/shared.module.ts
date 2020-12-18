import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsideMenuComponent } from './aside-menu/aside-menu.component';


@NgModule({
  declarations: [AsideMenuComponent],
  imports: [
    CommonModule
  ],
  exports: [AsideMenuComponent]
})
export class SharedModule { }
