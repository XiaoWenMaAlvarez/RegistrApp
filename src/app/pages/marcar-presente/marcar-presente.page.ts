import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, NavParams, LoadingController } from '@ionic/angular';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { Geolocation } from '@capacitor/geolocation';
import { Clase } from 'src/app/models/clase';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { ClaseAlumno } from 'src/app/models/clasealumno';

@Component({
  selector: 'app-marcar-presente',
  templateUrl: './marcar-presente.page.html',
  styleUrls: ['./marcar-presente.page.scss'],
})
export class MarcarPresentePage {

  public codigoQR;
  public profesor: string;
  public curso: string;
  private idClase;
  private clase: Clase;
  public latitud: number;
  public longitud: number;

  constructor(
    private navController: NavController,
    private navParams:NavParams,
    private claseService: ClaseService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private firebaseService: FirebaseService
  ) {
    this.codigoQR = {};
    this.profesor = "";
    this.curso = "";
    this.idClase = '';
  }

  loading() {
    return this.loadingController.create({spinner: "crescent"})
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'top'
    });
    toast.present();
  }

  async ionViewWillEnter() {
    this.codigoQR = this.navParams.data['codigoQR'];
    this.profesor = this.codigoQR.profesor;
    this.curso = this.codigoQR.curso;
    this.idClase = this.codigoQR.id_clase;
    this.cargarClase(this.idClase)

    const loading = await this.loading();
    await loading.present();
    const coordenadas = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,  
      maximumAge: 0 
    });
    this.latitud = coordenadas.coords.latitude;
    this.longitud = coordenadas.coords.longitude;
    loading.dismiss();
  }

  async cargarClase(idClase: string){
    const loading = await this.loading();
    await loading.present();
    let sub = this.claseService.encontrarClase(idClase).subscribe({
      next: (data: Clase[]) => {
        this.clase = data[0];
        loading.dismiss();
        sub.unsubscribe();
      }
    });
  }

  async marcarPresente() {
    const idEstudiante = this.navParams.data['idAlumno'];

    // VALIDAR HORA
    const horaActual = Date.now();
    const horaValida = this.claseService.validarHora(horaActual, this.clase.fecha);

    // VALIDAR LOCALIZACIÓN
    const coordenadasActuales = await Geolocation.getCurrentPosition();
    const latitudActual = coordenadasActuales.coords.latitude;
    const longitudActual = coordenadasActuales.coords.longitude;
    const localizacionValida = this.claseService.validarLocalizacion(latitudActual, longitudActual, this.clase.latitud, this.clase.longitud);

    //VALIDACIÓN TOTAL
    if(!horaValida) {
      this.presentToast("Hora inválida",5000)
      this.navController.navigateForward('/estudiante/tabs/cursos');
      return;
    }

    if(!localizacionValida) {
      this.presentToast("Ubicación inválida",5000)
      this.navController.navigateForward('/estudiante/tabs/cursos');
      return;
    }

    this.establecerPresencia(idEstudiante, this.idClase);
    this.presentToast("Has quedado presente!!!",5000)
    this.navController.navigateForward('/estudiante/tabs/cursos');
  }

  async establecerPresencia(idEstudiante: string, idClase: string){
    const loading = await this.loading();
    await loading.present();
    let sub = this.claseService.alumnoAsistioClase(idEstudiante, idClase).subscribe({
      next: (data: ClaseAlumno[]) => {
        let registro = data[0];
        registro.esta_presente = true;
        this.firebaseService.actualizarDocumento(`ClaseAlumno/${registro.id}`,registro);
        loading.dismiss();
        sub.unsubscribe();
      }
    });
  }
}
