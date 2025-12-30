import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoRepository } from '../../../../../domain/repositories/producto.repository';
import { Producto } from '../../../../../domain/models/producto.model';
import { ToastService } from '../../../../../core/services/toast';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.scss' // Reutiliza los mismos estilos
})
export class EditarProducto {
  @Input() productoParaEditar!: Producto;
  @Output() productoEditado = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  loading = false;
  constructor(private productoRepo: ProductoRepository, private toast: ToastService) {}

  guardar() {
    // Normalización idéntica a la de creación
    const payload: Producto = {
      ...this.productoParaEditar,
      precio: parseFloat(this.productoParaEditar.precio.toString().replace(',', '.')),
      stock: Math.floor(Number(this.productoParaEditar.stock))
    };

    if (!payload.id) return;

    this.loading = true;
    this.productoRepo.actualizarProducto(payload.id, payload).subscribe({
      next: () => {
        this.loading = false;
        this.productoEditado.emit();

        this.toast.show(
          `Acción realizada: "${this.productoParaEditar.nombre}" se ha actualizado correctamente.`, 
          'success'
        );
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al actualizar:', err);
      }
    });
  }

  cancelarOperacion() {
    this.cancelar.emit();
  }
}