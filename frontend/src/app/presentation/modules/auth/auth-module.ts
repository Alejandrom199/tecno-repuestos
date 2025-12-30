import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing-module'; // <-- REVISA QUE ESTÉ AQUÍ
import { Login } from './pages/login/login';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule, // <--- ESTO ES VITAL
    Login              // Tu componente standalone
  ]
})
export class AuthModule { }