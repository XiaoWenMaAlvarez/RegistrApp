import { inject, Injectable } from '@angular/core';
import {addDoc, collection, doc, getFirestore, updateDoc, deleteDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  agregarDocumento(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  actualizarDocumento(path: string, data: any){
    return updateDoc(doc(getFirestore(), path), data);
  }

  borrarDocumento(path: string){
    return deleteDoc(doc(getFirestore(),path));
  }
}
