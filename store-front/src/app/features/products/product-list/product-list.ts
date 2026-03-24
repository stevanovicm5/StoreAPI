import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, MatTableModule, CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private readonly productService = inject(ProductService);

  products$: Observable<Product[]> = this.productService.getAll();

  displayedColumns = ['name', 'description', 'price', 'stock'];
}
