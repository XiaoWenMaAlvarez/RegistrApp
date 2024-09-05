import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsEstudiantePageRoutingModule } from './tabs-estudiante-routing.module';

import { TabsEstudiantePage } from './tabs-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsEstudiantePageRoutingModule
  ],
  declarations: [TabsEstudiantePage]
})
export class TabsEstudiantePageModule {}
