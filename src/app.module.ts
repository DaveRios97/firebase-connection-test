import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ProductsController } from './products/products.controller';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [ProductsModule, FirebaseModule],
  controllers: [ProductsController],
})
export class AppModule {}
