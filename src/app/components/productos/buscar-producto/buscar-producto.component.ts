import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DetalleVenta } from 'src/app/models/detalle-venta';
import { Producto } from 'src/app/models/producto';
import { ProductoServicioService } from 'src/app/services/producto-servicio.service';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

  public columnsToDisplay = ['elegir','id','nombre','precio','stock'];
  public dataSource:any=new MatTableDataSource();
  public producto:Producto[]
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private productosServicio:ProductoServicioService,public dialog:MatDialog,
    public router:Router,private dialogRef: MatDialogRef<BuscarProductoComponent>) { }

  ngOnInit(): void {
    this.getProductos()
  }

  getProductos(){
    this.productosServicio.getProductos().subscribe((response:any)=>{
      this.producto=response;
      console.log(response);
      this.dataSource.data=this.producto;
      this.dataSource.paginator = this.paginator;
    })
  }

  mandarProductos(producto:DetalleVenta){
    this.dialogRef.close(producto)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
