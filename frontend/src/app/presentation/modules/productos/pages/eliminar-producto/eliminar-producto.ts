import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoRepository } from '../../../../../domain/repositories/producto.repository';
import { ToastService } from '../../../../../core/services/toast';

@Component({
  selector: 'app-eliminar-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar-producto.html',
  styleUrl: './eliminar-producto.scss'
})
export class EliminarProducto {
  @Input() productoId?: number;
  @Input() productoNombre: string = '';
  @Input() productoStock: number = 0;

  @Output() confirmado = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  loading = false;

  constructor(
    private productoRepo: ProductoRepository,
    private toast: ToastService
  ) {}

  confirmar() {
    // REGLA DE NEGOCIO: Bloqueo si hay stock
    if (this.productoStock > 0) {
      this.toast.show(
        `Acción denegada: "${this.productoNombre}" aún tiene ${this.productoStock} unidades en inventario.`, 
        'error'
      );
      this.cancelar.emit(); 
      return;
    }

    this.loading = true;
    this.productoRepo.eliminarProducto(this.productoId!).subscribe({
      next: () => {
        this.toast.show('Repuesto eliminado con éxito', 'success');
        this.confirmado.emit();
      },
      error: () => {
        this.toast.show('Error de servidor al intentar eliminar', 'error');
        this.loading = false;
      }
    });
  }
}