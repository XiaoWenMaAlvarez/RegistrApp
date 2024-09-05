import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaCursosEstPageRoutingModule } from './lista-cursos-est-routing.module';

import { ListaCursosEstPage } from './lista-cursos-est.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaCursosEstPageRoutingModule
  ],
  declarations: [ListaCursosEstPage]
})
export class ListaCursosEstPageModule {}
