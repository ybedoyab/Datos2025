import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from '../../../core/services/supabase.service';
import { Product, ProductCreateDto, ProductUpdateDto } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly tableName = signal('productos');
  private readonly supabase = inject(SupabaseService).client;

  state = signal({
    products: new Map<number, Product>(),
    currentPage: 1,
    totalPages: 1,
  });

  constructor() {
    this.getProducts();
  }

  getFormattedProducts(): Product[] {
    return Array.from(this.state().products.values());
  }

  async getProducts(page: number = 1, pageSize: number = 2) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await this.supabase
      .from(this.tableName())
      .select('*', { count: 'exact' })
      .range(from, to);

    if (error) {
      throw error;
    }

    const productsMap = new Map<number, Product>();
    data.forEach((product: Product) => {
      productsMap.set(product.id, product);
    });

    this.state.set({
      products: productsMap,
      currentPage: page,
      totalPages: count ? Math.ceil(count / pageSize) : 1,
    });
  }

  // async getProducts(page: number = 1, pageSize: number = 10): Promise<{ data: Product[]; count: number }> {
  //     const from = (page - 1) * pageSize;
  //     const to = from + pageSize - 1;

  //     const { data, error, count } = await this.supabase
  //       .from(this.tableName())
  //       .select('*', { count: 'exact' })
  //       .range(from, to);

  //     if (error) {
  //       throw error;
  //     }

  //     return { data: data as Product[], count: count || 0 };
  //   }

  async getProductById(id: number): Promise<Product | null> {
    const { data, error } = await this.supabase
      .from(this.tableName())
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data as Product;
  }

  async createProduct(product: ProductCreateDto): Promise<Product> {
    const { data, error } = await this.supabase
      .from(this.tableName())
      .insert(product)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Product;
  }

  async updateProduct(id: number, updates: ProductUpdateDto): Promise<Product> {
    const { data, error } = await this.supabase
      .from(this.tableName())
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Product;
  }

  async deleteProduct(id: number): Promise<void> {
    const { error } = await this.supabase.from(this.tableName()).delete().eq('id', id);

    if (error) {
      throw error;
    }
  }
}
