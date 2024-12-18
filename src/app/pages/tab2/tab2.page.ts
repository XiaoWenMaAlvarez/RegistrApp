import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import {Geolocation} from '@capacitor/geolocation';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import {LoadingController, NavParams, ToastController} from '@ionic/angular';
import {NavController} from '@ionic/angular';
import { Profesor } from 'src/app/models/profesor';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { CursoAlumno } from 'src/app/models/cursoalumno';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public cursos: Curso[];
  nombre: string;
  cursoElegido: Curso;
  public latitud: number;
  public longitud: number;

  constructor(
    public profesorService: ProfesorService,
    public cursosService: CursosService,
    public claseService: ClaseService,
    private navParams:NavParams,
    private navController:NavController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private firebaseService: FirebaseService
  ) {
    this.cursos = [];
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
    const idProfesor = this.navParams.data['idProfesor'];
    this.obtenerCursos(idProfesor)
    this.obtenerNombreProfesor(idProfesor);

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

  async generarQR(id_curso: string) {
    const loading = await this.loading();
    await loading.present();
    let nvaClase = {
      "id_curso": id_curso,
      "fecha": Date.now(),
      "latitud": this.latitud,
      "longitud": this.longitud,
      "id": ""
    }
    const response = this.firebaseService.agregarDocumento("clase", nvaClase)
    nvaClase.id = (await response).id;
    this.firebaseService.actualizarDocumento(`clase/${nvaClase.id}`,nvaClase)
    loading.dismiss();
    this.obtenerCurso(id_curso, nvaClase.id);
  }

  loading() {
    return this.loadingController.create({spinner: "crescent"})
  }

  async obtenerNombreProfesor(id:string) {
    const loading = await this.loading();
    await loading.present();
    let sub = this.profesorService.encontrarProfesorPorId(id).subscribe((data: Profesor[]) => {
      this.nombre = data[0].nombre;
      loading.dismiss();
      sub.unsubscribe();
    })
  }

  async obtenerCurso(id:string, nvaClaseId: string) {
    const loading = await this.loading();
    await loading.present();
    let sub = this.cursosService.encontrarCursoPorId(id).subscribe((data: Curso[]) => {
      this.cursoElegido = data[0];
      loading.dismiss();
      this.crearRegistrosDeAsistencia(nvaClaseId);
      sub.unsubscribe();
    })
  }

  async crearRegistrosDeAsistencia(idClase: string){
    const loading = await this.loading();
    await loading.present();
    let sub = this.cursosService.listaAlumnos(this.cursoElegido.id).subscribe({
      next: async (res: CursoAlumno[]) => {
        for(let item of res) {
          let nvoRegistro = {
            "id": '',
            "id_alumno": item.id_alumno,
            "id_clase": idClase,
            "esta_presente": false
          }
          let response = this.firebaseService.agregarDocumento("ClaseAlumno", nvoRegistro);
          nvoRegistro.id = (await response).id;
          this.firebaseService.actualizarDocumento(`ClaseAlumno/${nvoRegistro.id}`,nvoRegistro)
        }
        loading.dismiss();
        sub.unsubscribe();

        let contenidoQR = {
          "id_curso": this.cursoElegido.id,
          "profesor": this.nombre,
          "curso": this.cursoElegido.nombre + '_' + this.cursoElegido.seccion,
          "id_clase": idClase
        }
        this.navParams.data['contenidoQR'] = contenidoQR;
        this.navController.navigateForward('/profesor/tabs/toma-asistencia');
      }
    });
  }

  async obtenerCursos(idProfesor: string){
    const loading = await this.loading();
    await loading.present();
    let sub = this.cursosService.encontrarCursosPorProfesor(idProfesor).subscribe({
      next: (res: Curso[]) => {
        this.cursos = res;
        loading.dismiss();
        sub.unsubscribe();
      }
    });
  }

  logout() {
    this.profesorService.logout();
    this.navParams.data['idProfesor']  = 0;
    localStorage.removeItem("login")
    this.navController.navigateForward('/login');
  }

}
