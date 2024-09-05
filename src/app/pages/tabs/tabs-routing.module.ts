import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      },
      {
        path: 'descargar-reporte',
        loadChildren: () => import('../descargar-reporte/descargar-reporte.module').then( m => m.DescargarReportePageModule)
      },
      {
        path: 'toma-asistencia',
        loadChildren: () => import('../toma-asistencia/toma-asistencia.module').then( m => m.TomaAsistenciaPageModule)
      },
      {
        path: 'confirmar-asistencia',
        loadChildren: () => import('../confirmar-asistencia/confirmar-asistencia.module').then( m => m.ConfirmarAsistenciaPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
