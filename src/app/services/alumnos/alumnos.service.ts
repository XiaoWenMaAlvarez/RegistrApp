import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  
  encontrarAlumnoPorId(id: string) {
    return this.firestore.collection('alumno', ref => ref.where('id', '==', id)).valueChanges();
  }

  encontrarAlumnoPorCorreo(correo: string) {
    return this.firestore.collection('alumno', ref => ref.where('correo', '==', correo)).valueChanges();
  }

  login(correo: string, pass:string) {
    return signInWithEmailAndPassword(getAuth(), correo, pass)
  }

  setearPass(correo: string) {
    return sendPasswordResetEmail(getAuth(), correo)
  }

  logout() {
    getAuth().signOut();
  }

}
