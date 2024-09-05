import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvidarPassPageRoutingModule } from './olvidar-pass-routing.module';

import { OlvidarPassPage } from './olvidar-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvidarPassPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OlvidarPassPage]
})
export class OlvidarPassPageModule {}
