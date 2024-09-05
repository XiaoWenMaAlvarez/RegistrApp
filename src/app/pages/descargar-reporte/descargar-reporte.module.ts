import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescargarReportePageRoutingModule } from './descargar-reporte-routing.module';

import { DescargarReportePage } from './descargar-reporte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescargarReportePageRoutingModule
  ],
  declarations: [DescargarReportePage]
})
export class DescargarReportePageModule {}
