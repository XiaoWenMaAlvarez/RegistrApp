import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassRestablecidoPageRoutingModule } from './pass-restablecido-routing.module';

import { PassRestablecidoPage } from './pass-restablecido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassRestablecidoPageRoutingModule
  ],
  declarations: [PassRestablecidoPage]
})
export class PassRestablecidoPageModule {}
