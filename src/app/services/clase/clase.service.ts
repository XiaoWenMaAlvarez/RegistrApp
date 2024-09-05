import { Injectable } from '@angular/core';
import { Clase } from 'src/app/models/clase';
import { ClaseAlumno } from 'src/app/models/clasealumno';
import { CursosService } from '../cursos/cursos.service';
import { diferenciaEnMetros } from 'src/app/helpers/localizacion';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  private clase1: Clase = {
    "id": 1,
    "id_curso": 1,
    "fecha": 1724699083644,
    "latitud": -33.629622708470784,
    "longitud": -70.58994966511969
  }

  private clase2: Clase = {
    "id": 2,
    "id_curso": 1,
    "fecha": Date.now(),
    "latitud": -33.59835206174821,
    "longitud": -70.57976445045392
  }

  public clases:Clase[] = [this.clase1, this.clase2];
  public claseAlumno:ClaseAlumno[] = [
    {id: 1, id_clase: 1, id_alumno: 1, esta_presente: true},
    {id: 2, id_clase: 1, id_alumno: 2, esta_presente: false},

    {id: 3, id_clase: 2, id_alumno: 1, esta_presente: false},
    {id: 4, id_clase: 2, id_alumno: 2, esta_presente: false},
  ];

  constructor(private cursoService: CursosService) { }

  generarReporteAsistencia(id_curso: number) {
    const clases = this.clases.filter(clase => clase.id_curso === id_curso);
    const cantidadClases = clases.length;

    const listaAlumnos = this.cursoService.listaAlumnos(id_curso);

    let registroAsistencia = [];

    for(let i = 0; i < listaAlumnos.length; i++) {
      let clasesPresente = 0;
      for(let j = 0; j < clases.length; j++) {
        const registro = this.claseAlumno.find(reg => reg.id_clase === clases[j].id && reg.id_alumno === listaAlumnos[i]);
        if(registro.esta_presente) {
          clasesPresente = clasesPresente + 1;
        }
      }
      registroAsistencia.push(clasesPresente);
    }

    for(let i = 0; i < registroAsistencia.length; i++) {
      registroAsistencia[i] = (registroAsistencia[i] / cantidadClases * 100).toFixed(0) + '%';
    }

    return registroAsistencia;
  }

  crearClase(id_curso: number, fecha: number, latitud: number, longitud: number) {
    let nvaClase: Clase = {
      "id": this.clases.length + 1,
      "id_curso": id_curso,
      "fecha": fecha,
      "latitud": latitud,
      "longitud": longitud
    }

    let idNvaClase = nvaClase.id;

    this.clases.push(nvaClase);

    const listaAlumnos = this.cursoService.listaAlumnos(id_curso);
    for(let i = 0; i < listaAlumnos.length; i++) {
      let nvoRegistro:ClaseAlumno = {
        "id": this.claseAlumno.length + 1,
        "id_alumno": listaAlumnos[i],
        "id_clase": idNvaClase,
        "esta_presente": false
      }

      this.claseAlumno.push(nvoRegistro);
    }

    return idNvaClase;
  }

  borrarClase(id_clase: number) {
    this.claseAlumno = this.claseAlumno.filter(reg => reg.id_clase !== id_clase);
    this.clases = this.clases.filter(clase => clase.id !== id_clase);
  }

  calcularAsistenciaAlumno(id_alumno: number, id_curso: number) {
    const clases = this.clases.filter(clase => clase.id_curso === id_curso);
    const cantidadClases = clases.length;
    let clasesPresente = 0;
    for(let i = 0; i < clases.length; i++) {
      const registro = this.claseAlumno.find(reg => reg.id_clase === clases[i].id && reg.id_alumno === id_alumno);
      if(registro.esta_presente) {
        clasesPresente = clasesPresente + 1;
      }
    }
    return (clasesPresente / cantidadClases * 100).toFixed(0) + '%'
  }

  alumnoAsistioClase(id_alumno: number, id_clase: number) {
    const registro = this.claseAlumno.find(reg => reg.id_clase === id_clase && reg.id_alumno === id_alumno);
    return registro.esta_presente;
  }

  marcarPresente(id_alumno: number, id_clase: number) {
    const registro = this.claseAlumno.find(reg => reg.id_clase === id_clase && reg.id_alumno === id_alumno);
    registro.esta_presente = true;
  }
  
  validarHora(horaRecibida: number, idClase: number) {
    const clase = this.clases.find(reg => reg.id === idClase);
    const horaClase = clase.fecha;
    const differenceInMs = Math.abs(horaRecibida - horaClase);
    const differenceInMinutes = differenceInMs / (1000 * 60);

    if(differenceInMinutes > 5) {
      return false;
    }
    return true;
  }

  validarLocalizacion(latitudActual: number, longitudActual: number, idClase: number) {
    const clase = this.clases.find(reg => reg.id === idClase);
    const longitudClase = clase.longitud;
    const latitudClase = clase.latitud;

    const distanciaEnMetros = diferenciaEnMetros(latitudClase, longitudClase, latitudActual, longitudActual);

    if(distanciaEnMetros > 50) {
      return false;
    }
    return true;
  }

}
