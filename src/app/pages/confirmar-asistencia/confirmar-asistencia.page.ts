import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import {ToastController} from '@ionic/angular';


@Component({
  selector: 'app-confirmar-asistencia',
  templateUrl: './confirmar-asistencia.page.html',
  styleUrls: ['./confirmar-asistencia.page.scss'],
})
export class ConfirmarAsistenciaPage {

  public idClase: number;
  public idCurso: number;
  public nombreCurso: string;
  public listaAlumnos: number[];

  constructor(
    private navParams:NavParams,
    private navController:NavController,
    public alumnosService: AlumnosService,
    public cursosService: CursosService,
    public claseService: ClaseService,
    private toastController: ToastController
  ) {
    this.listaAlumnos = [];
  }

  ionViewWillEnter() {
    const contenidoQR = this.navParams.data['contenidoQR'];
    this.idClase = contenidoQR["id_clase"];
    this.idCurso = contenidoQR["id_curso"];
    this.nombreCurso = contenidoQR["curso"];
    this.listaAlumnos = this.cursosService.listaAlumnos(this.idCurso);
  }

  async confirmarAsistencia() {
    const toast = await this.toastController.create({
      message: "Asistencia confirmada",
      duration: 5000,
      position: 'top'
    });
    await toast.present();
    this.navController.navigateForward('profesor/tabs/tab1');
  }

  async cancelarAsistencia() {
    this.listaAlumnos = [];
    this.claseService.borrarClase(this.idClase);
    const toast = await this.toastController.create({
      message: "Clase eliminada con éxito",
      duration: 5000,
      position: 'top'
    });
    await toast.present();
    this.navController.navigateForward('profesor/tabs/tab1');
  }

}
