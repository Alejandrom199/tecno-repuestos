import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error' | 'warning';
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts: ToastMessage[] = [];
  public toasts$ = new BehaviorSubject<ToastMessage[]>([]);

  show(text: string, type: 'success' | 'error' | 'warning' = 'success') {
    const id = Date.now();
    this.toasts.push({ text, type, id });
    this.toasts$.next([...this.toasts]);

    // Auto-eliminar después de 4 segundos
    setTimeout(() => this.remove(id), 4000);
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.toasts$.next([...this.toasts]);
  }
}