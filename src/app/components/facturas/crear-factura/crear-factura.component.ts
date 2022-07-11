import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetalleVenta } from 'src/app/models/detalle-venta';
import { Venta } from 'src/app/models/venta';
import { BuscarClienteComponent } from '../../clientes/buscar-cliente/buscar-cliente.component';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {
  factura:Venta=new Venta()
  nombreCliente:any
  detalleVenta:DetalleVenta[]

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  openDialogBuscar(){
    const dialogRef= this.dialog.open(BuscarClienteComponent,{
      width:'500px',
      height:'400px',
      
      
    });
    dialogRef.afterClosed().subscribe(result=>{
      //console.log(result)
      this.factura.cliente=result
      this.nombreCliente=this.factura.cliente.nombre+" "+this.factura.cliente.apellido
      
      //console.log(this.nombreCliente)
      console.log(this.factura)
      
    
    })
  }

}
