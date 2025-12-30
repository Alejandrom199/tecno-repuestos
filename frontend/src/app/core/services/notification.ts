import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  // Aquí podrías usar una librería como SweetAlert2 o Toastr
  showError(message: string) {
    alert(`❌ Error: ${message}`);
  }

  showSuccess(message: string) {
    alert(`✅ Éxito: ${message}`);
  }
}