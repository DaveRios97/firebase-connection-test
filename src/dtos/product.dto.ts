import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { IProduct } from '../interfaces/product.interface';

/** Clase que valida los datos para crear un Producto */
export class CreateProductDto implements IProduct {
  /** Nombre */
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  /** Descripción */
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  /** Precio */
  @IsNumber()
  readonly price: number;

  /** Foto del producto */
  @IsUrl()
  @IsNotEmpty()
  readonly mainPhoto: string;
}

/** Clase que valida los datos al actualizar un producto */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
