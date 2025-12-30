import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthRepository } from './domain/repositories/auth.repository';
import { AuthRepositoryImpl } from './data/repositories/auth-repository.impl';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ProductoRepository } from './domain/repositories/producto.repository';
import { ProductoRepositoryImpl } from './data/repositories/producto-repository.impl';
import { AuditoriaRepository } from './domain/repositories/auditoria.repository';
import { AuditoriaRepositoryImpl } from './data/repositories/auditoria-repository.impl';

providers: [
  { provide: AuthRepository, useClass: AuthRepositoryImpl },
  { provide: ProductoRepository, useClass: ProductoRepositoryImpl },
  { provide: AuditoriaRepository, useClass: AuditoriaRepositoryImpl },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
]