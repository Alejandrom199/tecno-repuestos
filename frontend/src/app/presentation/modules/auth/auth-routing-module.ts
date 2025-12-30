import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login'; // Verifica que el path al componente sea correcto
import { Register } from './pages/register/register';
import { guestGuard } from '../../../core/guards/guest-guard';

const routes: Routes = [
  { 
    path: 'login', 
    component: Login, 
    canActivate: [guestGuard]
  },
  { 
    path: 'register', 
    component: Register, 
    canActivate: [guestGuard] 
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { } 