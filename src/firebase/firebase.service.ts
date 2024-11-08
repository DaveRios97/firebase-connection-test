import { Injectable } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor() {
    // Lectura de la clave privada generada en JSON por firebase
    const serviceAccount: ServiceAccount = require('../../firebaseServiceAccountKey.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  getFirestore() {
    return admin.firestore();
  }
}
