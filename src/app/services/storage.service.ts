import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot, DocumentData } from '@angular/fire/compat/firestore';
import { firstValueFrom, from, map, Observable, tap } from 'rxjs';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private firestore: AngularFirestore) { }

  saveDoc(data: any, path: string, id: string | undefined) {
    const docRef = this.firestore.collection(path).doc(id);
    return docRef.set(data);
  }

  async getById(path: string, id: string | undefined){
    const docRef = await firstValueFrom<Usuario[]>(this.firestore.collection<Usuario>(path).valueChanges()); // .subscribe(x => console.log("hola",x))
    return docRef.find(x => x.uid == id);
  }
}