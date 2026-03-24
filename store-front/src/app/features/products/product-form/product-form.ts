import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../core/models/product.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private readonly productService = inject(ProductService);
  private readonly dialogRef = inject(MatDialogRef<ProductForm>);
  private readonly data = inject<{ product: Product | null }>(MAT_DIALOG_DATA);

  product = this.data.product;
  isLoading = signal(false);
  error = signal<string | null>(null);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2)]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    stock: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
  });

  ngOnInit() {
    if (this.product) {
      this.form.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        stock: this.product.stock,
      });
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;

    this.isLoading.set(true);
    this.error.set(null);

    try {
      if (this.product) {
        await firstValueFrom(
          this.productService.update(this.product.id, {
            name: this.form.value.name!,
            description: this.form.value.description!,
            price: this.form.value.price!,
            stock: this.form.value.stock!,
          }),
        );
      } else {
        await firstValueFrom(
          this.productService.create({
            name: this.form.value.name!,
            description: this.form.value.description!,
            price: this.form.value.price!,
            stock: this.form.value.stock!,
          }),
        );
      }

      this.dialogRef.close(true);
    } catch {
      this.error.set('Failed to save product.');
    } finally {
      this.isLoading.set(false);
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
