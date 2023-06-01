import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Mensaje } from '../clases/mensaje';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  rutaDeLaColeccion = '/mensajes';
  referenciaAlaColeccion: AngularFirestoreCollection<Mensaje>;

  constructor(private bd: AngularFirestore) {
    this.referenciaAlaColeccion = bd.collection(this.rutaDeLaColeccion);
  }

  CreateMensaje(mensaje: Mensaje): any {
    return this.referenciaAlaColeccion.add({ ...mensaje });
  }

  GetMensajes(): any {
    return this.referenciaAlaColeccion
      .valueChanges()
      .pipe(
        map((mensajes: Mensaje[]) => mensajes.sort((a, b) => b.hora.localeCompare(a.hora)))
      );
  }
}
