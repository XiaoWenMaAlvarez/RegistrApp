import { Injectable } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private alumno1: Alumno = {
    "id": 1,
    "nombre": "Juan Alberto Pérez Gonzales",
    "correo": "ju.perez@duocuc.cl",
    "pass": "alumno123"
  }

  private alumno2: Alumno = {
    "id": 2,
    "nombre": "Rodrigo Fernando Rojas Morales",
    "correo": "ro.rojas@duocuc.cl",
    "pass": "alumno456"
  }

  public alumnos:Alumno[] = [this.alumno1, this.alumno2];


  constructor() { }

  encontrarAlumnoPorId(id: number) { 
    return this.alumnos.find(alumno => alumno.id === id);
  }

  listaNombresPorId(listaIds: number[]){
    let listaNombres = [];
    for(let i = 0; i < listaIds.length; i++) {
      let alumnoEncontrado = this.encontrarAlumnoPorId(listaIds[i])
      listaNombres.push(alumnoEncontrado.nombre);
    }
    return listaNombres;
  }

  login(correo: string, pass:string) {
    let alumnoEncontrado = this.alumnos.find(alumno => alumno.correo === correo);
    if (alumnoEncontrado.pass === pass){
      return alumnoEncontrado.id
    }else {
      return 0;
    }
  }

  setearPass(correo: string) {
    const nvoPass = Date.now().toString();
    let alumnoEncontrado = this.alumnos.find(alumno => alumno.correo === correo);
    if(alumnoEncontrado) {
      alumnoEncontrado.pass = nvoPass;
      console.log(nvoPass)
      return true;
    }
    return false;
  }

}
