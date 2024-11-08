import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Product } from 'src/entities/product.entity';
import { FirestoreRepository } from '../repositories/firestore.repository';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ProductsService {
  /** Repositorio de Productos usando un Firestore Repository generico */
  private productRepository: FirestoreRepository<Product>;

  /** Constructor de la clase Product Service donde se inyecta in FirestoreRepository de clase Product */
  constructor(private readonly firebaseService: FirebaseService) {
    this.productRepository = new FirestoreRepository<Product>(
      this.firebaseService,
      'products',
    );
  }

  /** Obtener todos los productos */
  async getAll(): Promise<Product[]> {
    const products = this.productRepository
      .finAll()
      .then((prod) => {
        return prod;
      })
      .catch((err) => {
        throw new InternalServerErrorException(err.message);
      });
    return products;
  }

  /** Obtener un producto por id */
  getOne(id: string): Promise<Product> {
    const product = this.productRepository
      .findOne(id)
      .then((prod) => {
        return prod;
      })
      .catch((err) => {
        throw new InternalServerErrorException(err.message);
      });
    return product;
  }

  /** Crear un producto */
  create(payload: CreateProductDto): Promise<Product> {
    const product = this.productRepository
      .create(payload)
      .then((prod) => {
        return prod;
      })
      .catch((err) => {
        throw new InternalServerErrorException(err.message);
      });
    return product;
  }

  /** Actualizar un producto */
  update(id: string, payload: UpdateProductDto) {
    const product = this.productRepository
      .update(id, payload)
      .then((prod) => {
        return prod;
      })
      .catch((err) => {
        throw new InternalServerErrorException(err.message);
      });
    return product;
  }

  /** Borrar un producto */
  delete(id: any) {
    const product = this.productRepository
      .delete(id)
      .then((prod) => {
        return prod;
      })
      .catch((err) => {
        throw new InternalServerErrorException(err.message);
      });
    return product;
  }
}
