import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../../core/services/product/product.service';
import { Product } from '../../../core/models/product.model';
import { firstValueFrom } from 'rxjs';
import { ProductForm } from '../../products/product-form/product-form';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-admin-panel',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    CurrencyPipe,
  ],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel {
  private readonly productService = inject(ProductService);
  private readonly dialog = inject(MatDialog);
  displayedColumns = ['name', 'description', 'price', 'stock', 'actions'];

  products = signal<Product[]>([]);
  isLoading = signal(false);

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    this.isLoading.set(true);
    try {
      const products = await firstValueFrom(this.productService.getAll());
      this.products.set(products);
    } finally {
      this.isLoading.set(false);
    }
  }

  async openCreateDialog() {
    const dialogRef = this.dialog.open(ProductForm, {
      width: '560px',
      maxWidth: '95vw',
      data: { product: null },
    });

    const result = await firstValueFrom(dialogRef.afterClosed());
    if (result) await this.loadProducts();
  }

  async openEditDialog(product: Product) {
    const dialogRef = this.dialog.open(ProductForm, {
      width: '560px',
      maxWidth: '95vw',
      data: { product },
    });

    const result = await firstValueFrom(dialogRef.afterClosed());
    if (result) await this.loadProducts();
  }

  async deleteProduct(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '420px',
      data: {
        title: 'Delete product',
        message: 'Are you sure you want to delete this product? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    const confirmed = await firstValueFrom(dialogRef.afterClosed());
    if (!confirmed) return;

    try {
      await firstValueFrom(this.productService.delete(id));
      await this.loadProducts();
    } catch {
      console.error('Failed to delete product');
    }
  }
}
