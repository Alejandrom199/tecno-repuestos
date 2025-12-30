import { Routes } from '@angular/router';
import { MainLayout } from './presentation/shared/components/main-layout/main-layout';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  // 1. Auth no debe ser hijo de nadie
  { 
    path: 'auth', 
    loadChildren: () => import('./presentation/modules/auth/auth-module').then(m => m.AuthModule) 
  },
  
  // 2. Ruta inicial
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // 3. Rutas protegidas (Cambia el path a 'admin' o 'p' para probar)
  { 
    path: 'p', 
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { 
        path: 'productos', 
        loadChildren: () => import('./presentation/modules/productos/productos-module').then(m => m.ProductosModule) 
      }
    ]
  },

  // 4. El comodín
  { path: '**', redirectTo: 'auth/login' }
];