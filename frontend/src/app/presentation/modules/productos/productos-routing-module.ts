import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductos } from './pages/lista-productos/lista-productos';
import { CrearProducto } from './pages/crear-producto/crear-producto';

const routes: Routes = [
  { path: '', component: ListaProductos },
  { path: 'nuevo', component: CrearProducto }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { } 