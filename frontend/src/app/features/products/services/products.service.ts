import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../../../core/services/supabase.service';
import { Product, ProductCreateDto, ProductUpdateDto } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly tableName = 'productos';
  private readonly supabase = inject(SupabaseService).client;

  async getProducts(): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) {
      throw error;
    }

    return data as Product[];
  }

  async getProductById(id: number): Promise<Product | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
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
      .from(this.tableName)
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
      .from(this.tableName)
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
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  }
}
