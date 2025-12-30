import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoRepository } from '../../../../../domain/repositories/producto.repository';
import { Producto } from '../../../../../domain/models/producto.model';
import { ToastService } from '../../../../../core/services/toast';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-producto.html',
  styleUrl: './crear-producto.scss'
})
export class CrearProducto {
  @Output() productoCreado = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  nuevoProducto: Producto = {
    nombre: '',
    categoria: '',
    descripcion: '',
    precio: 0,
    stock: 0,
  };

  loading = false;

  constructor(private productoRepo: ProductoRepository, private toast: ToastService) {}

  guardar() {
    if (!this.nuevoProducto.nombre || !this.nuevoProducto.categoria) return;

    // Normalización de números para asegurar el uso de "." decimal
    // Convertimos explícitamente a Number para limpiar cualquier formato de string regional
    const payload: Producto = {
      ...this.nuevoProducto,
      precio: parseFloat(this.nuevoProducto.precio.toString().replace(',', '.')),
      stock: Math.floor(Number(this.nuevoProducto.stock))
    };

    if (payload.precio < 0 || payload.stock < 0) {
      alert('El precio y el stock no pueden ser valores negativos');
      return;
    }

    this.loading = true;
    this.productoRepo.crearProducto(payload).subscribe({
      next: () => {
        this.loading = false;
        this.productoCreado.emit();

        this.toast.show(
          `Acción realizada: "${this.nuevoProducto.nombre}" se ha creado correctamente.`, 
          'success'
        );
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al crear:', err);
      }
    });
  }

  cancelarOperacion() {
    this.cancelar.emit();
  }
}