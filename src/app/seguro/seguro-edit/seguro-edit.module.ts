import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguroEditPageRoutingModule } from './seguro-edit-routing.module';

import { SeguroEditPage } from './seguro-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguroEditPageRoutingModule
  ],
  declarations: [SeguroEditPage]
})
export class SeguroEditPageModule {}
