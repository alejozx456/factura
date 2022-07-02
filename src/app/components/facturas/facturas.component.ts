import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/clientes';
import { Venta } from 'src/app/models/venta';
import { BuscarClienteComponent } from '../clientes/buscar-cliente/buscar-cliente.component';
import { DetalleClienteComponent } from '../clientes/detalle-cliente/detalle-cliente.component';
import { BuscarProductoComponent } from '../productos/buscar-producto/buscar-producto.component';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  factura:Venta=new Venta();
  nombreCliente:any

  constructor(private activatedRoute:ActivatedRoute,public dialog:MatDialog) { }

  ngOnInit(): void {
    
  }

  openDialogBuscar(){
    const dialogRef= this.dialog.open(BuscarClienteComponent,{
      width:'500px',
      height:'400px',
      
      
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result)
      this.factura.cliente=result
      this.nombreCliente=this.factura.cliente.nombre+" "+this.factura.cliente.apellido
      console.log(this.nombreCliente)
    
    })
  }

  openDialogBuscarProducto(){
    const dialogRef2= this.dialog.open(BuscarProductoComponent,{
      width:'500px',
      height:'400px',
      
      
    });
    dialogRef2.afterClosed().subscribe(result=>{
      this.factura.items.push(result)
      console.log(this.factura.items)
    
    })
  }

}
