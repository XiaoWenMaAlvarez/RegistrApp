import { inject, Injectable } from '@angular/core';
import { Clase } from 'src/app/models/clase';
import { ClaseAlumno } from 'src/app/models/clasealumno';
import { CursosService } from '../cursos/cursos.service';
import { diferenciaEnMetros } from 'src/app/helpers/localizacion';
import {AngularFirestore} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  firestore = inject(AngularFirestore);

  encontrarClaseAlumno(id_clase: string) { 
    return this.firestore.collection('ClaseAlumno', ref => ref.where('id_clase', '==', id_clase)).valueChanges();
  }

  encontrarClases(id_curso: string) { 
    return this.firestore.collection('clase', ref => ref.where('id_curso', '==', id_curso)).valueChanges();
  }

  alumnoAsistioClase(id_alumno: string, id_clase: string) {
    return this.firestore.collection('ClaseAlumno', ref => ref.where('id_alumno', '==', id_alumno).where('id_clase', '==', id_clase)).valueChanges();
  }

  encontrarClase(id_clase: string) { 
    return this.firestore.collection('clase', ref => ref.where('id', '==', id_clase)).valueChanges();
  }
  
  validarHora(horaRecibida: number, horaClase: number) {
    const differenceInMs = Math.abs(horaRecibida - horaClase);
    const differenceInMinutes = differenceInMs / (1000 * 60);

    if(differenceInMinutes > 5) {
      return false;
    }
    return true;
  }

  validarLocalizacion(latitudActual: number, longitudActual: number, latitudClase: number, longitudClase: number) {
    const distanciaEnMetros = diferenciaEnMetros(latitudClase, longitudClase, latitudActual, longitudActual);
    if(distanciaEnMetros > 100) {
      return false;
    }
    return true;
  }
}
