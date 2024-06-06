import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguroListPage } from './seguro-list.page';

const routes: Routes = [
  {
    path: '',
    component: SeguroListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguroListPageRoutingModule {}
