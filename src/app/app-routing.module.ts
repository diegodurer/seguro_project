import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'seguro-list',
    loadChildren: () => import('./seguro/seguro-list/seguro-list.module').then( m => m.SeguroListPageModule)
  },
  {
    path: 'seguro-edit',
    loadChildren: () => import('./seguro/seguro-edit/seguro-edit.module').then( m => m.SeguroEditPageModule)
  },
  {
    path: 'seguro-edit/:id',
    loadChildren: () => import('./seguro/seguro-edit/seguro-edit.module').then( m => m.SeguroEditPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
