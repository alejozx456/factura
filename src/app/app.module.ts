import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { CrearClienteComponent } from './components/clientes/crear-cliente/crear-cliente.component';
import { DetalleClienteComponent } from './components/clientes/detalle-cliente/detalle-cliente.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { DetalleFacturaComponent } from './components/facturas/detalle-factura/detalle-factura.component';
import { BuscarClienteComponent } from './components/clientes/buscar-cliente/buscar-cliente.component';
import { BuscarProductoComponent } from './components/productos/buscar-producto/buscar-producto.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ClientesComponent,
    CrearClienteComponent,
    DetalleClienteComponent,
    FacturasComponent,
    DetalleFacturaComponent,
    BuscarClienteComponent,
    BuscarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
