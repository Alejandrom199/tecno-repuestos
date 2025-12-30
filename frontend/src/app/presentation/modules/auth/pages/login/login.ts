import { Component } from '@angular/core';
import { AuthRepository } from '../../../../../domain/repositories/auth.repository';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // Asegúrate de que diga standalone si no usas módulos
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  user = {
    username: '',
    password: ''
  };

  error: string | null = null;
  loading = false;

  constructor(
    private authRepository: AuthRepository,
    private router: Router
  ) {}

  onLogin() { 
  // Ya no necesitas event.preventDefault() porque ngSubmit lo hace por ti
  this.loading = true;
  this.error = null;

  this.authRepository.login(this.user.username, this.user.password).subscribe({
    next: (res) => {
      console.log('Login exitoso:', res);
      this.router.navigate(['/p/productos']);
    },
    error: (err) => {
      console.error('Error en login:', err);
      this.error = 'Usuario o clave incorrectos';
      this.loading = false;
    }
  });
}
}