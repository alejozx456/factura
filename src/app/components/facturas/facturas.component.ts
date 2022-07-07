import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/clientes';
import { DetalleVenta } from 'src/app/models/detalle-venta';
import { Venta } from 'src/app/models/venta';
import { FacturaServicioService } from 'src/app/services/factura-servicio.service';

import { BuscarClienteComponent } from '../clientes/buscar-cliente/buscar-cliente.component';
import { DetalleClienteComponent } from '../clientes/detalle-cliente/detalle-cliente.component';
import { BuscarProductoComponent } from '../productos/buscar-producto/buscar-producto.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  factura:Venta=new Venta();
  detalleFactura=new DetalleVenta();

  nombreCliente:any
  public columnsToDisplay = ['producto','precio','cantidad','total'];
  public dataSource:any=new MatTableDataSource();
  


  constructor(private activatedRoute:ActivatedRoute,public dialog:MatDialog,public facturaServicio:FacturaServicioService,
    public router:Router) { }

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
      
    
    })
  }

  openDialogBuscarProducto(){
    const dialogRef2= this.dialog.open(BuscarProductoComponent,{
      width:'500px',
      height:'400px',
      
      
    });
    dialogRef2.afterClosed().subscribe(result=>{
      this.detalleFactura=result
      //let listadetalle:DetalleVenta[]
      //listadetalle.push(result)
      //this.item.push(result)
      //this.factura.items=result
      //this.nuevoItem.producto=result
      this.factura.items.push(this.detalleFactura)
     //this.dataSource=this.factura.items
     this.dataSource.connect().next(this.factura.items)
      console.log(this.dataSource)
      console.log(this.factura)
      console.log(this.detalleFactura)
      //console.log(listadetalle)

    
    })
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  crearFactura(){
    this.facturaServicio.createFactura(this.factura).subscribe(factura=>{
      Swal.fire("Venta",`Factura${factura.descripcion} creada con exito`,'success');
      this.router.navigate(['/clientes']);
    })
  }

 
  

}
