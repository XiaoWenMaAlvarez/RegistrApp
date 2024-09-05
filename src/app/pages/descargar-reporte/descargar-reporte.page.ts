import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';

@Component({
  selector: 'app-descargar-reporte',
  templateUrl: './descargar-reporte.page.html',
  styleUrls: ['./descargar-reporte.page.scss'],
})
export class DescargarReportePage{

  public idCurso: number;
  public nombreCurso: string;

  constructor(
    private navParams:NavParams,
    public cursosService: CursosService,
    public alumnosService: AlumnosService,
    public claseService: ClaseService,
  ) {
    }

  ionViewWillEnter() {
    this.idCurso = this.navParams.data['idCurso'];
    this.nombreCurso = this.cursosService.encontrarCursoPorId(this.idCurso).nombre + "_" 
    + this.cursosService.encontrarCursoPorId(this.idCurso).seccion 
  }

  generarPDF() {
    console.log("PDF");
  }

  generarExcel(){
    console.log("Excel");
  }

}
