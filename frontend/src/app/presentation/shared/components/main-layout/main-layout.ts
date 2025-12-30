import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthRepository } from '../../../../domain/repositories/auth.repository';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayout {
  constructor(private authRepo: AuthRepository, private router: Router) {}

  logout() {
    this.authRepo.logout(); // Llama a la eliminación de cookies
    localStorage.removeItem('isLoggedIn'); // Limpia la marca del Guard
    this.router.navigate(['/auth/login']);
  }
}