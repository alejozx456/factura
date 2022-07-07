import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente/crear-cliente.component';
import { DetalleClienteComponent } from './components/clientes/detalle-cliente/detalle-cliente.component';
import { DetalleFacturaComponent } from './components/facturas/detalle-factura/detalle-factura.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { ListaFacturaComponent } from './components/facturas/lista-factura/lista-factura.component';

const routes: Routes = [
  {path:"clientes",component:ClientesComponent},
  {path:"clientes/form",component:CrearClienteComponent},
  {path:"clientes/form/:id", component:CrearClienteComponent},
  {path:"clientes/ver/:id",component:DetalleClienteComponent},
  {path:"facturas/:id",component:DetalleFacturaComponent},
  {path:"facturas",component:FacturasComponent},
  {path:"listar",component:ListaFacturaComponent},
  {path:'',redirectTo:'clientes',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
