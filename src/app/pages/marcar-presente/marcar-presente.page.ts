import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, NavParams } from '@ionic/angular';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-marcar-presente',
  templateUrl: './marcar-presente.page.html',
  styleUrls: ['./marcar-presente.page.scss'],
})
export class MarcarPresentePage {

  public codigoQR;
  public profesor;
  public curso;
  private idClase;

  constructor(
    private toastController: ToastController,
    private navController: NavController,
    private navParams:NavParams,
    private claseService: ClaseService,
  ) {
    this.codigoQR = {};
    this.profesor = "";
    this.curso = "";
    this.idClase = 0;
  }

  ionViewWillEnter() {
    this.codigoQR = this.navParams.data['codigoQR'];
    this.profesor = this.codigoQR.profesor;
    this.curso = this.codigoQR.curso;
    this.idClase = this.codigoQR.id_clase;
  }

  async marcarPresente() {
    const idEstudiante = this.navParams.data['idAlumno'];

    // VALIDAR HORA
    const horaActual = Date.now();
    const horaValida = this.claseService.validarHora(horaActual, this.idClase);

    // VALIDAR LOCALIZACIÓN
    const coordenadasActuales = await Geolocation.getCurrentPosition();
    const latitudActual = coordenadasActuales.coords.latitude;
    const longitudActual = coordenadasActuales.coords.longitude;
    const localizacionValida = this.claseService.validarLocalizacion(latitudActual, longitudActual, this.idClase);

    //VALIDACIÓN TOTAL
    if(!horaValida) {
      const toast = await this.toastController.create({
        message: "Hora inválida",
        duration: 5000,
        position: 'top'
      });
      await toast.present();
      this.navController.navigateForward('/estudiante/tabs/cursos');
      return;
    }

    if(!localizacionValida) {
      const toast = await this.toastController.create({
        message: "Ubicación inválida",
        duration: 5000,
        position: 'top'
      });
      await toast.present();
      this.navController.navigateForward('/estudiante/tabs/cursos');
      return;
    }

    this.claseService.marcarPresente(idEstudiante, this.idClase);
    const toast = await this.toastController.create({
      message: "Has quedado presente!!!",
      duration: 5000,
      position: 'top'
    });
    await toast.present();
    this.navController.navigateForward('/estudiante/tabs/cursos');
  }
}
