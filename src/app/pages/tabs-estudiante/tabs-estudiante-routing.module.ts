import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsEstudiantePage } from './tabs-estudiante.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsEstudiantePage,
    children: [
      {
        path: 'cursos',
        loadChildren: () => import('../lista-cursos-est/lista-cursos-est.module').then(m => m.ListaCursosEstPageModule)
      },
      {
        path: 'qr',
        loadChildren: () => import('../leer-qr/leer-qr.module').then(m => m.LeerQrPageModule)
      },
      {
        path: 'presente',
        loadChildren: () => import('../marcar-presente/marcar-presente.module').then( m => m.MarcarPresentePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsEstudiantePageRoutingModule {}
