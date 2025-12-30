import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthRepository } from './domain/repositories/auth.repository';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`
})
export class App implements OnInit {
  constructor(private authRepo: AuthRepository) {}

  ngOnInit() {
    // Verificamos si existe una cookie válida en el navegador al cargar la app
    this.authRepo.checkAuthStatus().subscribe(isValid => {
      if (isValid) {
        console.log('Sesión recuperada mediante Cookie');
      }
    });
  }
}