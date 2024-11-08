import { IProduct } from '../interfaces/product.interface';

export class Product implements IProduct {
  /** Nombre */
  name: string;

  /** Descripción */
  description: string;

  /** Precio */
  price: number;

  /** Foto del producto */
  mainPhoto: string;
}
