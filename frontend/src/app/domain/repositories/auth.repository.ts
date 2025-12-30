import { Observable } from 'rxjs';
import { AuthResponse } from '../models/usuario.model';

export abstract class AuthRepository {
  // 1. Métodos base que ya tenías
  abstract login(username: string, password: string): Observable<AuthResponse>;
  abstract register(user: any): Observable<AuthResponse>;
  abstract logout(): void;

  // 2. NUEVO: Estado reactivo para que el Guard y el Layout reaccionen
  // Usamos un getter para saber el estado actual en RAM
  abstract get isAuthenticated(): boolean;

  // 3. NUEVO: Para verificar la cookie contra el backend al refrescar (F5)
  abstract checkAuthStatus(): Observable<boolean>;
}