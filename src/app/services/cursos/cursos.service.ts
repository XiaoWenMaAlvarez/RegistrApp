import { inject, Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  firestore = inject(AngularFirestore);

  encontrarCursosPorProfesor(id_profesor: string) { 
    return this.firestore.collection('curso', ref => ref.where('id_profesor', '==', id_profesor)).valueChanges();
  }

  listaAlumnos(id_curso: string) {
    return this.firestore.collection('CursoAlumno', ref => ref.where('id_curso', '==', id_curso)).valueChanges();
  }
  
  encontrarCursoPorId(id_curso: string){
    return this.firestore.collection('curso', ref => ref.where('id', '==', id_curso)).valueChanges();
  }

  encontrarCursorPorAlumno(id_alumno: string) { 
    return this.firestore.collection('CursoAlumno', ref => ref.where('id_alumno', '==', id_alumno)).valueChanges();
  }

}
