import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Curso } from 'src/app/models/curso';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';
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
    private navController:NavController
  ) {
    this.cursos = [];
  }

  ionViewWillEnter() {
    const idProfesor = this.navParams.data['idProfesor'];
    this.cursos = this.cursosService.encontrarCursorPorProfesor(idProfesor);
  }

  async generarReporte(id_curso: number) {
    this.navParams.data['idCurso'] = id_curso;
    this.navController.navigateForward('profesor/tabs/descargar-reporte');
  }

  logout() {
    this.navParams.data['idProfesor']  = 0;
    this.navController.navigateForward('/login');
  }
}
