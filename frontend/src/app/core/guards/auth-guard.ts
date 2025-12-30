import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { map, take, of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authRepo = inject(AuthRepository);
  const router = inject(Router);

  // 1. Si ya sabemos en memoria que está logueado, lo dejamos pasar de inmediato
  if (authRepo.isAuthenticated) {
    return true;
  }

  // 2. Si no, le preguntamos al backend (esto pasará solo al cargar la app o F5)
  return authRepo.checkAuthStatus().pipe(
    take(1),
    map(isValid => {
      if (isValid) return true;

      // Solo si el servidor confirma que NO hay sesión, redirigimos
      console.warn('Guard: Sesión inválida, redirigiendo a login');
      router.navigate(['/auth/login']);
      return false;
    })
  );
};