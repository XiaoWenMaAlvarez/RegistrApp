import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescargarReportePage } from './descargar-reporte.page';

const routes: Routes = [
  {
    path: '',
    component: DescargarReportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescargarReportePageRoutingModule {}
