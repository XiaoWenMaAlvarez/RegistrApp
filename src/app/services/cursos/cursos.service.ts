import { Injectable } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { CursoAlumno } from 'src/app/models/cursoalumno';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private curso1: Curso = {
    "id": 1,
    "id_profesor": 1,
    "nombre": "PROGRAMACION DE APLICACIONES MOVILES",
    "seccion": "010D"
  }

  private curso2: Curso = {
    "id": 2,
    "id_profesor": 1,
    "nombre": "ARQUITECTURA",
    "seccion": "011D"
  }

  public cursos:Curso[] = [this.curso1, this.curso2];
  public cursoAlumno: CursoAlumno[] = [{id: 1, id_curso: 1, id_alumno: 1}, {id: 2, id_curso: 1, id_alumno: 2}];
  

  constructor() { }

  encontrarCursorPorProfesor(id_profesor: number) { 
    return this.cursos.filter(curso => curso.id_profesor === id_profesor);
  }

  listaAlumnos(id_curso: number) {
    let alumnos = this.cursoAlumno.filter(reg => reg.id_curso === id_curso);
    return alumnos.map(reg => reg.id_alumno);
  }

  encontrarCursoPorId(id_curso: number){
    return this.cursos.find(curso => curso.id === id_curso);
  }

  encontrarCursorPorAlumno(id_alumno: number) { 
    let registros = this.cursoAlumno.filter(reg => reg.id_alumno === id_alumno);
    let cursos = [];
    for(let i = 0; i < registros.length; i++) {
      cursos.push(this.cursos.find(curso => curso.id === registros[i].id_curso)) 
    }
    return cursos;
  }

}
