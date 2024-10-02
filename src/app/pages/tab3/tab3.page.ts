import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, ToastController } from '@ionic/angular';
import { Curso } from 'src/app/models/curso';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public cursos: Curso[];

  constructor(
    public profesorService: ProfesorService,
    public cursosService: CursosService,
    public claseService: ClaseService,
    private navParams:NavParams,
    private navController:NavController,
    private toastController: ToastController,
    private loadingController: LoadingController,
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

  loading() {
    return this.loadingController.create({spinner: "crescent"})
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
        loading.dismiss();
        sub.unsubscribe();
      }
    });
  }

  async generarReporte(id_curso: string) {
    this.navParams.data['idCurso'] = id_curso;
    this.navController.navigateForward('profesor/tabs/descargar-reporte');
  }

  logout() {
    this.profesorService.logout();
    this.navParams.data['idProfesor']  = 0;
    this.navController.navigateForward('/login');
  }
}
