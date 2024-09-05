import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarcarPresentePageRoutingModule } from './marcar-presente-routing.module';

import { MarcarPresentePage } from './marcar-presente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarcarPresentePageRoutingModule
  ],
  declarations: [MarcarPresentePage]
})
export class MarcarPresentePageModule {}
