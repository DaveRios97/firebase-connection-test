import { Injectable } from '@nestjs/common';
import { CollectionReference, Firestore } from 'firebase-admin/firestore';

import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
/** Clase que abstrae las operaciones CRUD para una conexión a Firebase/Firestore en un patron Repository */
export class FirestoreRepository<T> {
  /** Instancia de firestore */
  private firestore: Firestore;

  /** Constructor para inicializar un repositorio generico */
  constructor(
    private readonly firesbaseService: FirebaseService,
    private readonly collectionName: string,
  ) {
    this.firestore = this.firesbaseService.getFirestore();
  }

  /** Metodo que obtiene la colección usando el nombre de la coleccion para instanciarlo */
  private getCollection(): CollectionReference<any> {
    return this.firestore.collection(this.collectionName);
  }

  /** Obtener todos los objetos T */
  async finAll(): Promise<T[]> {
    try {
      const snapshopt = await this.getCollection().get();
      return snapshopt.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
    } catch (err) {
      throw new Error(`Error al obtener documentos: ${err.message}`);
    }
  }

  /** Obtener un objeto T por id */
  async findOne(id: string): Promise<T> {
    try {
      const doc = await this.getCollection().doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() } as T;
      }
      return [] as T;
    } catch (err) {
      throw new Error(`No se ha encontrado el documento ${err.message}`);
    }
  }

  /** Crear un objeto T */
  async create(data: T): Promise<T> {
    try {
      const docRef = await this.getCollection().add(data);
      const newDoc = await docRef.get();
      return { id: newDoc.id, ...newDoc.data() };
    } catch (err) {
      throw new Error(`No se ha podido crear el documento ${err.message}`);
    }
  }

  /** Actualizar un objeto T por id */
  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      const docRef = this.getCollection().doc(id);
      await docRef.update(data);

      const updateDoc = await docRef.get();
      return updateDoc.exists
        ? ({ id: updateDoc.id, ...updateDoc.data() } as T)
        : null;
    } catch (err) {
      throw new Error(`No se ha podido actualziar el documento ${err.message}`);
    }
  }

  /** Borrar un objeto T por id */
  async delete(id: string): Promise<T> {
    try {
      const docRef = this.getCollection().doc(id);
      const docSnapshot = await docRef.get();

      if (!docSnapshot.exists) {
        return [] as T;
      }

      const deletedData = { id: docSnapshot.id, ...docSnapshot.data() } as T;
      await docRef.delete();
      return deletedData;
    } catch (err) {
      throw new Error(`No se ha podido eliminar el documento ${err.message}`);
    }
  }
}
