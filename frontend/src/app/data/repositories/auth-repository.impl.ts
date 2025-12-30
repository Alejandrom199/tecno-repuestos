import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthResponse } from '../../domain/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryImpl extends AuthRepository {
  private apiUrl = `${environment.apiUrl}/auth`;
  
  private isLogged$ = new BehaviorSubject<boolean>(false);
  private isInitialized = false; 

  constructor(private http: HttpClient) {
    super();
  }

  get isAuthenticated(): boolean {
    return this.isLogged$.value;
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`, 
      { username, password },
      { withCredentials: true } 
    ).pipe(
      tap(() => this.isLogged$.next(true))
    );
  }

  // IMPLEMENTACIÓN DE REGISTER (Faltaba este método)
  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/registrar`, 
      userData // Enviamos username, password, email y rol
    );
  }

  checkAuthStatus(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check`, { withCredentials: true }).pipe(
      tap(isValid => {
        this.isLogged$.next(isValid);
        this.isInitialized = true; // Marcamos que ya sabemos la verdad
      }),
      catchError(() => {
        this.isLogged$.next(false);
        this.isInitialized = true;
        return of(false);
      })
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.isLogged$.next(false);
        window.location.href = '/auth/login';
      }
    });
  }
}