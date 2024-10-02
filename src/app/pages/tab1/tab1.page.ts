import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams, ToastController } from '@ionic/angular';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { CursoAlumno } from 'src/app/models/cursoalumno';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public cursos: Curso[];
  public alumnos: Alumno[][];

  constructor(
    public alumnosService: AlumnosService,
    public cursosService: CursosService,
    public claseService: ClaseService,
    private navParams:NavParams,
    private navController:NavController,
    private profesorService: ProfesorService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.cursos = [];
    this.alumnos = [];
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

  ionViewWillEnter() {
    const idProfesor = this.navParams.data['idProfesor'];
    this.obtenerCursos(idProfesor)
  }

  async obtenerCursos(idProfesor: string){
    const loading = await this.loading();
    await loading.present();
    let sub = this.cursosService.encontrarCursosPorProfesor(idProfesor).subscribe({
      next: (res: Curso[]) => {
        this.cursos = res;
        for(let curso of this.cursos) {
          this.alumnos[curso.id] = []
          this.obtenerAlumnos(curso.id);
        }
        loading.dismiss();
        sub.unsubscribe();
      }
    });
  }

  async obtenerAlumnos(idCurso: string){
    const loading = await this.loading();
    await loading.present();
    let sub = this.cursosService.listaAlumnos(idCurso).subscribe({
      next: (res: CursoAlumno[]) => {
        let listaIds = res.map(item => item.id_alumno);
        for(let id of listaIds) {
          this.obtenerAlumno(id, idCurso);
        }
        loading.dismiss();
        sub.unsubscribe();
      }
    });
  }

  async obtenerAlumno(idAlumno: string, idCurso){
    const loading = await this.loading();
    await loading.present();
    let sub = this.alumnosService.encontrarAlumnoPorId(idAlumno).subscribe({
      next: (data: Alumno[]) => {
        this.alumnos[idCurso].push(data[0]);
        loading.dismiss();
        sub.unsubscribe();
      }
    });
  }

  logout() {
    this.profesorService.logout();
    this.navParams.data['idProfesor']  = 0;
    this.navController.navigateForward('/login');
  }

}
