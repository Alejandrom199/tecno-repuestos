import { Component } from '@angular/core';
import { AuthRepository } from '../../../../../domain/repositories/auth.repository';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss', // Reutilizamos el estilo del login
})
export class Register {
  user = {
    username: '',
    email: '',
    password: '',
    rol: 'VENDEDOR' // Valor por defecto según tu modelo de Sequelize
  };

  error: string | null = null;
  loading = false;

  constructor(
    private authRepository: AuthRepository,
    private router: Router
  ) {}

  onRegister() {
    this.loading = true;
    this.error = null;

    this.authRepository.register(this.user).subscribe({
      next: (res) => {
        console.log('Registro exitoso:', res);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Error en registro:', err);
        // Intentamos capturar el mensaje de error del backend
        this.error = err.error?.message || 'Error al crear la cuenta. Intenta con otro usuario o email.';
        this.loading = false;
      }
    });
  }
}