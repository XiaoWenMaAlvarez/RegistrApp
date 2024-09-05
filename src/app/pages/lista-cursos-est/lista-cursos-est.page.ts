import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Curso } from 'src/app/models/curso';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';

@Component({
  selector: 'app-lista-cursos-est',
  templateUrl: './lista-cursos-est.page.html',
  styleUrls: ['./lista-cursos-est.page.scss'],
})
export class ListaCursosEstPage  {

  public cursos: Curso[];
  public idEstudiante: number;

  constructor(
    public cursosService: CursosService,
    public claseService: ClaseService,
    private navParams:NavParams,
    private navController:NavController
  ) { 
    this.cursos = [];
  }

  ionViewWillEnter() {
    this.idEstudiante = this.navParams.data['idAlumno'];
    this.cursos = this.cursosService.encontrarCursorPorAlumno(this.idEstudiante);
  }

  logout() {
    this.navParams.data['idAlumno']  = 0;
    this.navController.navigateForward('/login');
  }

}
