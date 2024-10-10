import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams, ToastController } from '@ionic/angular';
import { Clase } from 'src/app/models/clase';
import { ClaseAlumno } from 'src/app/models/clasealumno';
import { Curso } from 'src/app/models/curso';
import { CursoAlumno } from 'src/app/models/cursoalumno';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';

@Component({
  selector: 'app-lista-cursos-est',
  templateUrl: './lista-cursos-est.page.html',
  styleUrls: ['./lista-cursos-est.page.scss'],
})
export class ListaCursosEstPage  {

  public cursos: Curso[];
  public idEstudiante: string;
  public idsClases
  public asistencia

  constructor(
    public cursosService: CursosService,
    public claseService: ClaseService,
    private navParams:NavParams,
    private navController:NavController,
    private alumnosService: AlumnosService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { 
    this.cursos = [];
    this.asistencia = []
    this.idsClases = []
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
    this.cursos = []
    this.asistencia = []
    this.idsClases = []
    this.idEstudiante = this.navParams.data['idAlumno'];
    this.cargarCursoAlumno(this.idEstudiante);
  }

  async cargarClases(){
    const loading = await this.loading();
    await loading.present();
    for(let curso of this.cursos) {
      this.idsClases[curso.id] = [];
      let sub = this.claseService.encontrarClases(curso.id).subscribe({
        next: (res: Clase[]) => {
          let listaIds = res.map(item => item.id);
          for(let idClase of listaIds) {
            this.idsClases[curso.id].push(idClase);
          }
          this.cargarAsistencia();
          loading.dismiss();
          sub.unsubscribe();
        }
      });
    }
  }

  async cargarAsistencia(){
    const loading = await this.loading();
    await loading.present();
    for(let curso of this.cursos) {
      let clasesAsistidas = 0;
      let totalClases = this.idsClases[curso.id].length;
      for(let idClase of this.idsClases[curso.id]) {
        let sub = this.claseService.alumnoAsistioClase(this.idEstudiante, idClase).subscribe({
          next: (data: ClaseAlumno[]) => {
            if(data[0].esta_presente){
              clasesAsistidas = clasesAsistidas + 1;
              this.asistencia[curso.id] = (clasesAsistidas / totalClases * 100).toFixed(0) + '%';
            }
            loading.dismiss();
            sub.unsubscribe();
          }
        });
      }
    }
  }

  async cargarCursoAlumno(idAlumno: string){
    const loading = await this.loading();
    await loading.present();
    let sub = this.cursosService.encontrarCursorPorAlumno(idAlumno).subscribe({
      next: (res: CursoAlumno[]) => {
        for(let i = 0; i < res.length ; i++) {
          this.cargarCurso(res[i].id_curso, i, res.length);
        }
        loading.dismiss();
        sub.unsubscribe();
      }
    });
  }

  async cargarCurso(idCurso: string, posicionCurso: number, totalCurso: number){
    const loading = await this.loading();
    await loading.present();
    let sub = this.cursosService.encontrarCursoPorId(idCurso).subscribe({
      next: (res: Curso[]) => {
        this.cursos.push(res[0])
        loading.dismiss();
        sub.unsubscribe();
        if(posicionCurso === totalCurso - 1) {
          this.cargarClases();
        }
      }
    });
  }

  logout() {
    this.alumnosService.logout();
    this.navParams.data['idAlumno']  = '';
    localStorage.removeItem("login")
    this.navController.navigateForward('/login');
  }
}
