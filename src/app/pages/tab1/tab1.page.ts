import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Curso } from 'src/app/models/curso';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public cursos: Curso[];

  constructor(
    public alumnosService: AlumnosService,
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

  logout() {
    this.navParams.data['idProfesor']  = 0;
    this.navController.navigateForward('/login');
  }

}
