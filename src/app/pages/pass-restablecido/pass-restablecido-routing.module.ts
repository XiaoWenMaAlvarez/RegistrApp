import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassRestablecidoPage } from './pass-restablecido.page';

const routes: Routes = [
  {
    path: '',
    component: PassRestablecidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassRestablecidoPageRoutingModule {}
