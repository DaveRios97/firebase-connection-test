import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly preoductService: ProductsService) {}

  /** Obtener todos productos */
  @Get()
  getAll() {
    return this.preoductService.getAll();
  }

  /** Obtener un producto */
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.preoductService.getOne(id);
  }
  /** Crear un producto */
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.preoductService.create(payload);
  }

  /** Actualizar un producto */
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.preoductService.update(id, payload);
  }

  /** Eliminar un producto */
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.preoductService.delete(id);
  }
}
