import { Injectable, signal } from '@angular/core';
import { supabase } from '../shared/supabase-service';

export interface Product {
  id: number;
  nombre: string;
  created_at: string; // o Date si lo conviertes
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly tableName = 'productos';

  async getAllProducts() {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*');

    if (error) {
      throw error;
    }

    return data as Product[];
  }
}
