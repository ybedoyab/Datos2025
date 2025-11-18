export interface Product {
  id: number;
  nombre: string;
  created_at: string;
}

export interface ProductCreateDto {
  nombre: string;
}

export interface ProductUpdateDto {
  nombre?: string;
}
