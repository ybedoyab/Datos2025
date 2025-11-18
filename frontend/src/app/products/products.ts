import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ProductsService, Product } from '../services/products-service';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products {
  private productsService = inject(ProductsService);
  
  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    this.loadProducts();
  }

  private async loadProducts() {
    try {
      this.loading.set(true);
      const data = await this.productsService.getAllProducts();
      this.products.set(data);
      this.error.set(null);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al cargar productos');
    } finally {
      this.loading.set(false);
    }
  }
}
