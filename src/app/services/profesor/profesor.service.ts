import { Injectable } from '@angular/core';
import { Profesor } from 'src/app/models/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private profesor1: Profesor = {
    "id": 1,
    "nombre": "Erik Andrés Arcos Rojas",
    "correo": "er.arcos@profesor.duoc.cl",
    "pass": "profesor123"
  }
  public profesores:Profesor[] = [this.profesor1];

  constructor() { }

  encontrarProfesorPorId(id: number) { 
    return this.profesores.find(profesor => profesor.id === id);
  }

  login(correo: string, pass:string) {
    let profesorEncontrado = this.profesores.find(profesor => profesor.correo === correo);
    if (profesorEncontrado.pass === pass){
      return profesorEncontrado.id
    }else {
      return 0;
    }
  }

  setearPass(correo: string) {
    const nvoPass = Date.now().toString();
    let profesorEncontrado = this.profesores.find(profesor => profesor.correo === correo);
    if(profesorEncontrado) {
      profesorEncontrado.pass = nvoPass;
      console.log(nvoPass)
      return true;
    }
    return false;
  }
  
}
