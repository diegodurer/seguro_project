import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguroListPageRoutingModule } from './seguro-list-routing.module';

import { SeguroListPage } from './seguro-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguroListPageRoutingModule
  ],
  declarations: [SeguroListPage]
})
export class SeguroListPageModule {}
