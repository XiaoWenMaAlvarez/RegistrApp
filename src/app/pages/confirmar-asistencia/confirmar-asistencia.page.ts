import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import {ToastController} from '@ionic/angular';
import { CursoAlumno } from 'src/app/models/cursoalumno';
import { Alumno } from 'src/app/models/alumno';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { ClaseAlumno } from 'src/app/models/clasealumno';


@Component({
  selector: 'app-confirmar-asistencia',
  templateUrl: './confirmar-asistencia.page.html',
  styleUrls: ['./confirmar-asistencia.page.scss'],
})
export class ConfirmarAsistenciaPage {

  public idClase: string;
  public idCurso: string;
  public nombreCurso: string;
  public listaAlumnos: Alumno[];
  public listaAsistencia;

  constructor(
    private navParams:NavParams,
    private navController:NavController,
    public alumnosService: AlumnosService,
    public cursosService: CursosService,
    public claseService: ClaseService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private firebaseService: FirebaseService
  ) {
    this.listaAlumnos = [];
    this.idClase = '';
    this.idCurso = '';
    this.nombreCurso = '';
    this.listaAsistencia = []

  }

  ionViewWillEnter() {
    const contenidoQR = this.navParams.data['contenidoQR'];
    this.idClase = contenidoQR["id_clase"];
    this.idCurso = contenidoQR["id_curso"];
    this.nombreCurso = contenidoQR["curso"];
    this.cargarListaAlumnos(this.idCurso);
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

  async cargarListaAlumnos(idCurso: string){
    const loading = await this.loading();
    await loading.present();
    let sub = this.cursosService.listaAlumnos(idCurso).subscribe({
      next: (res: CursoAlumno[]) => {
        let listaIds = res.map(item => item.id_alumno);
        for(let id of listaIds) {
          this.obtenerAlumno(id);
          this.asistioClase(id, this.idClase);
        }
        loading.dismiss();
        sub.unsubscribe();
      }
    });
  }

  async obtenerAlumno(idAlumno: string){
    const loading = await this.loading();
    await loading.present();
    let sub = this.alumnosService.encontrarAlumnoPorId(idAlumno).subscribe({
      next: (data: Alumno[]) => {
        this.listaAlumnos.push(data[0]);
        loading.dismiss();
        sub.unsubscribe();
      }
    });
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
    this.firebaseService.borrarDocumento(`clase/${this.idClase}`)
    const loading = await this.loading();
    await loading.present();
    let sub = this.claseService.encontrarClaseAlumno(this.idClase).subscribe({
      next: (res: ClaseAlumno[]) => {
        for(let item of res) {
          this.firebaseService.borrarDocumento(`ClaseAlumno/${item.id}`)
        }
        loading.dismiss();
        sub.unsubscribe();
      }
    });

    this.presentToast('Clase eliminada con éxito', 5000)
    this.navController.navigateForward('profesor/tabs/tab1');
  }

  async asistioClase(idAlumno:string, idClase:string) {
    const loading = await this.loading();
    await loading.present();
    let sub = this.claseService.alumnoAsistioClase(idAlumno, idClase).subscribe((data: ClaseAlumno[]) => {
      loading.dismiss();
      sub.unsubscribe();
      if(data[0]) {
        this.listaAsistencia[idAlumno] = data[0].esta_presente;
      }
    })
  }

}
