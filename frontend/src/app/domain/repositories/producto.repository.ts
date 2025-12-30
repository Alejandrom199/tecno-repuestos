import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { LogAuditoria } from '../models/log.model';

export abstract class ProductoRepository {
  abstract getProductos(): Observable<Producto[]>;
  abstract crearProducto(producto: Producto): Observable<Producto>;
  abstract actualizarProducto(id: number, producto: Producto): Observable<Producto>;
  abstract eliminarProducto(id: number): Observable<void>;
}