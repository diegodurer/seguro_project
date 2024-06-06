import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguroEditPage } from './seguro-edit.page';

const routes: Routes = [
  {
    path: '',
    component: SeguroEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguroEditPageRoutingModule {}
