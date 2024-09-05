import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarcarPresentePage } from './marcar-presente.page';

const routes: Routes = [
  {
    path: '',
    component: MarcarPresentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarcarPresentePageRoutingModule {}
