import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-toma-asistencia',
  templateUrl: './toma-asistencia.page.html',
  styleUrls: ['./toma-asistencia.page.scss'],
})
export class TomaAsistenciaPage {

  public contenidoQR: string;

  constructor(
    private navParams:NavParams,
    private navController:NavController
  ) {}

  ionViewWillEnter() {
    this.contenidoQR = JSON.stringify(this.navParams.data['contenidoQR']);
  }

  finalizarAsistencia() {
    this.navController.navigateForward('profesor/tabs/confirmar-asistencia');
  }

}
