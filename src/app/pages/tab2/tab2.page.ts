import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import {Geolocation} from '@capacitor/geolocation';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import {NavParams} from '@ionic/angular';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
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
    let idProfesor = this.navParams.data['idProfesor'];
    this.cursos = this.cursosService.encontrarCursorPorProfesor(idProfesor);
  }

  async generarQR(id_curso: number) {
    const coordenadas = await Geolocation.getCurrentPosition();
    let idClase = this.claseService.crearClase(id_curso, Date.now(), coordenadas.coords.latitude, coordenadas.coords.longitude);
    let idProfesor = this.navParams.data['idProfesor'];
    let contenidoQR = {
      "id_curso": id_curso,
      "id_clase": idClase,
      "profesor": this.profesorService.encontrarProfesorPorId(idProfesor).nombre,
      "curso": this.cursosService.encontrarCursoPorId(id_curso).nombre + '_' + this.cursosService.encontrarCursoPorId(id_curso).seccion,
      "url": "https://www.pagina.com/post/" + idClase
    }

    this.navParams.data['contenidoQR'] = contenidoQR;
    this.navController.navigateForward('/profesor/tabs/toma-asistencia');
  }

  logout() {
    this.navParams.data['idProfesor']  = 0;
    this.navController.navigateForward('/login');
  }

}
