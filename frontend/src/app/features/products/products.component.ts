import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Product } from './models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  
  readonly products = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.loadProducts();
  }

  private async loadProducts(): Promise<void> {
    try {
      this.loading.set(true);
      const data = await this.productsService.getProducts();
      this.products.set(data);
      this.error.set(null);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al cargar productos');
    } finally {
      this.loading.set(false);
    }
  }
}
