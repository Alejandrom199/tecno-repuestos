import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../../../domain/models/producto.model';
import { ProductoRepository } from '../../../../../domain/repositories/producto.repository';
import { RouterModule } from '@angular/router';
import { CrearProducto } from "../crear-producto/crear-producto";
import { EditarProducto } from "../editar-producto/editar-producto";
import { EliminarProducto } from "../eliminar-producto/eliminar-producto";
import { DetalleProducto } from "../detalle-producto/detalle-producto";
import { ToastContainer } from "../../../../shared/components/toast-container/toast-container"; // Importar

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [
  CommonModule, 
    RouterModule, 
    ToastContainer, 
    CrearProducto, 
    EditarProducto, 
    EliminarProducto, 
    DetalleProducto
],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.scss',
})
export class ListaProductos implements OnInit {
  productos: Producto[] = [];
  loading = true;

  mostrarModalCrear = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  mostrarModalDetalle = false;

  productoSeleccionado: any = null;

  constructor(private productoRepo: ProductoRepository) {}

  ngOnInit() { this.cargarProductos(); }

  cargarProductos() {
    this.loading = true;
    this.productoRepo.getProductos().subscribe({
      next: (res: any) => {
        this.productos = Array.isArray(res) ? res : (res.data || []);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  abrirDetalles(item: Producto) {
    this.productoSeleccionado = item;
    this.mostrarModalDetalle = true;
  }

  abrirEditar(item: Producto) {
    // Clonamos el objeto para que los cambios en el form no afecten la tabla visualmente si se cancela
    this.productoSeleccionado = JSON.parse(JSON.stringify(item)); 
    this.mostrarModalEditar = true;
  }

  abrirEliminar(item: Producto) {
    this.productoSeleccionado = item;
    this.mostrarModalEliminar = true;
  }

  onOperacionExitosa() {
    this.mostrarModalCrear = false;
    this.mostrarModalEditar = false;
    this.mostrarModalEliminar = false;
    this.cargarProductos(); // Recarga la lista desde el servidor
  }
}