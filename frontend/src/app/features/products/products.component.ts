import { Component, inject, signal, ChangeDetectionStrategy, computed } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Product } from './models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  
  readonly products = computed(() => this.productsService.getFormattedProducts());

  currentPage = computed(() => this.productsService.state().currentPage);
  totalPages = computed(() => this.productsService.state().totalPages);

  nextPage() {
    const current = this.currentPage();
    const total = this.totalPages();
    if (current < total) {
      this.productsService.getProducts(current + 1);
    }
  }

  previousPage() {
    const current = this.currentPage();
    if (current > 1) {
      this.productsService.getProducts(current - 1);
    }
  }
}
