import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

/** Modulo global con la conexion a Firebase */
@Global()
@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
