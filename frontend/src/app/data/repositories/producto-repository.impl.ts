import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductoRepository } from '../../domain/repositories/producto.repository';
import { Producto } from '../../domain/models/producto.model';
import { LogAuditoria } from '../../domain/models/log.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoRepositoryImpl extends ProductoRepository {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    super();
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/productos`, { withCredentials: true });
  }

  crearProducto(producto: Producto): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, producto, {
      // Vital para que el navegador adjunte la cookie HttpOnly
      withCredentials: true 
    });
  }

  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/productos/${id}`, producto, { withCredentials: true });
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/productos/${id}`, { withCredentials: true });
  }
}