import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/clientes';
import { Venta } from 'src/app/models/venta';
import { DetalleFacturaComponent } from '../../facturas/detalle-factura/detalle-factura.component';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {

  public columnsToDisplay = ['id','descripcion','fecha','total'];
  public dataSource:any=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  

  constructor(@Inject(MAT_DIALOG_DATA) public cliente:Cliente,
  public dialog:MatDialog) { }

  ngOnInit(): void {
    console.log(this.cliente)
    this.getData();
    console.log(this.dataSource)
  }

  getData(){
    this.dataSource=this.cliente.facturas;
    this.dataSource.paginator = this.paginator;
  }
  openDialogDetalleFactura(factura:Venta){
    const dialogRef= this.dialog.open(DetalleFacturaComponent,{
      width:'500px',
      height:'600px',
      data:factura
      
      
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log('OK')
     
    
    })
  }

}
