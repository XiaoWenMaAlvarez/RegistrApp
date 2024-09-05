import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomaAsistenciaPage } from './toma-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: TomaAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TomaAsistenciaPageRoutingModule {}
