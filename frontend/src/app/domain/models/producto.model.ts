export interface Producto {
  id?: number;
  nombre: string;
  categoria: string;
  descripcion: string; 
  precio: number;
  stock: number;
  activo?: boolean; 
}