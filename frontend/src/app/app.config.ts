import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { AuthRepository } from "./domain/repositories/auth.repository";
import { ProductoRepository } from "./domain/repositories/producto.repository";
import { AuditoriaRepository } from "./domain/repositories/auditoria.repository";
import { AuthRepositoryImpl } from "./data/repositories/auth-repository.impl";
import { ProductoRepositoryImpl } from "./data/repositories/producto-repository.impl";
import { AuditoriaRepositoryImpl } from "./data/repositories/auditoria-repository.impl";
import { JwtInterceptor } from "./core/interceptors/jwt.interceptor";
import { routes } from "./app.routes";
import { ErrorInterceptor } from "./core/interceptors/error-handler.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Ahora sí tendrá Zone disponible
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
    { provide: ProductoRepository, useClass: ProductoRepositoryImpl },
    { provide: AuditoriaRepository, useClass: AuditoriaRepositoryImpl },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ]
};