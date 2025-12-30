import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { map, take } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const authRepo = inject(AuthRepository);
  const router = inject(Router);

  // 1. Si ya está marcado como autenticado en memoria
  if (authRepo.isAuthenticated) {
    router.navigate(['/p/productos']);
    return false;
  }

  // 2. Si no, verificamos con el backend
  return authRepo.checkAuthStatus().pipe(
    take(1),
    map(isValid => {
      if (isValid) {
        router.navigate(['/p/productos']);
        return false;
      }
      return true; // No está logueado, puede ver Login/Register
    })
  );
};