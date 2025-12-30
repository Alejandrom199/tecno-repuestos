import { Routes } from '@angular/router';
import { MainLayout } from './presentation/shared/components/main-layout/main-layout';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard'; // <--- Importamos el nuevo guard

export const routes: Routes = [
  { 
    path: 'auth', 
    canActivate: [guestGuard], // <--- Un logueado ya no puede entrar a /auth/login o /auth/register
    loadChildren: () => import('./presentation/modules/auth/auth-module').then(m => m.AuthModule) 
  },
  // Cambiamos la redirección raíz al dashboard. 
  // Los guards decidirán si el usuario puede entrar o si debe ir a login.
  { path: '', redirectTo: 'p/productos', pathMatch: 'full' }, 
  { 
    path: 'p', 
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { 
        path: 'productos', 
        loadChildren: () => import('./presentation/modules/productos/productos-module').then(m => m.ProductosModule) 
      },
      { 
        path: 'auditoria', 
        loadChildren: () => import('./presentation/modules/admin-logs/admin-logs-module').then(m => m.AdminLogsModule) 
      }
    ]
  },
  { path: '**', redirectTo: 'p/productos' } // Cualquier ruta desconocida intenta ir al dashboard
];