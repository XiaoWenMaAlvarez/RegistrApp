import { Component } from '@angular/core';
import { LoadingController, NavParams, ToastController } from '@ionic/angular';
import { Alumno } from 'src/app/models/alumno';
import { Clase } from 'src/app/models/clase';
import { ClaseAlumno } from 'src/app/models/clasealumno';
import { Curso } from 'src/app/models/curso';
import { CursoAlumno } from 'src/app/models/cursoalumno';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { ClaseService } from 'src/app/services/clase/clase.service';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-descargar-reporte',
  templateUrl: './descargar-reporte.page.html',
  styleUrls: ['./descargar-reporte.page.scss'],
})
export class DescargarReportePage{

  public idCurso: string;
  public nombreCurso: string;
  public alumnos: Alumno[];
  public cantidadClases: number;
  public claseAlumno: ClaseAlumno[]
  

  constructor(
    private navParams:NavParams,
    public cursosService: CursosService,
    public alumnosService: AlumnosService,
    public claseService: ClaseService,
    private toastController: ToastController,
    private loadingController: LoadingController,
  ) {
    this.idCurso = '';
    this.nombreCurso = '';
    this.alumnos = [];
    this.cantidadClases = 0;
    this.claseAlumno = [];
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    }

    loading() {
      return this.loadingController.create({spinner: "crescent"})
    }
  
    async presentToast(message: string, duration: number) {
      const toast = await this.toastController.create({
        message: message,
        duration: duration,
      });
      toast.present();
    }

  ionViewWillEnter() {
    this.alumnos = [];
    this.claseAlumno = []
    this.idCurso = this.navParams.data['idCurso'];
    this.obtenerCurso(this.idCurso);
    this.obtenerAlumnos(this.idCurso);
    this.cargarRegistroClases(this.idCurso);
  }

  calcularAsistencia(idAlumno: string){
    let clasesAsistidas = 0;
    for(let item of this.claseAlumno) {
      if(item.id_alumno === idAlumno){
        if(item.esta_presente) {
          clasesAsistidas = clasesAsistidas + 1;
        }
      }
    }
    return (clasesAsistidas / this.cantidadClases * 100).toFixed(0) + '%';
  }


  async cargarRegistroClases(idCurso: string){
    const loading = await this.loading();
    await loading.present();
    let sub = this.claseService.encontrarClases(idCurso).subscribe({
      next: (res: Clase[]) => {
        let listaIds = res.map(item => item.id);
        this.cantidadClases = listaIds.length
        for(let idClase of listaIds) {
          this.obtenerClaseAlumno(idClase);
        }
        loading.dismiss();
        sub.unsubscribe();
      }
    });
  }

  async obtenerClaseAlumno(idClase: string){
    const loading = await this.loading();
    await loading.present();
    let sub = this.claseService.encontrarClaseAlumno(idClase).subscribe({
      next: (data: ClaseAlumno[]) => {
        for(let item of data) {
          this.claseAlumno.push(item);
          this.calcularAsistencia(item.id_alumno);
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
          this.obtenerAlumno(id);
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
        this.alumnos.push(data[0]);
        loading.dismiss();
        sub.unsubscribe();
      }
    });
  }

  async obtenerCurso(id:string) {
    const loading = await this.loading();
    await loading.present();
    let sub = this.cursosService.encontrarCursoPorId(id).subscribe((data: Curso[]) => {
      this.nombreCurso = data[0].nombre + "_" + data[0].seccion;
      loading.dismiss();
      sub.unsubscribe();
    })
  }

  generarPDF() {
    const data = []
    for(let alumno of this.alumnos) {
      const registro = [alumno.nombre, this.calcularAsistencia(alumno.id)]
      data.push(registro);
    }

    let content = "";
    for(let item of data) {
      content = content + item[0] + " - " + item[1] + "\n";
    }

    const documentDefinition = { content: content };
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download(`${this.nombreCurso}` + '.pdf');
  }

  generarExcel(){
    const headers: string[] = ['Nombre del alumno', 'Porcentaje de asistencia'];
    const data = []
    for(let alumno of this.alumnos) {
      const registro = {Nombre: alumno.nombre, Asistencia: this.calcularAsistencia(alumno.id)}
      data.push(registro);
      console.log(registro)
    }
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asistencia');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.guardarExcel(excelBuffer, `${this.nombreCurso}` + '.xlsx');
  }

  guardarExcel(buffer: any, fileName: string) {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click(); 
  }
}
