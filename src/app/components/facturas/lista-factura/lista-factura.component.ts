import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Venta } from 'src/app/models/venta';
import { FacturaServicioService } from 'src/app/services/factura-servicio.service';

@Component({
  selector: 'app-lista-factura',
  templateUrl: './lista-factura.component.html',
  styleUrls: ['./lista-factura.component.css']
})
export class ListaFacturaComponent implements OnInit {

  public columnsToDisplay = ['detalle','id','descripcion','fecha','total'];
  public dataSource:any=new MatTableDataSource();
  public facturas:Venta[]

  @ViewChild(MatPaginator) paginator:MatPaginator;


  constructor(public facturaServicio:FacturaServicioService) { }

  ngOnInit(): void {
    this.getDataClientes()
  }
  getDataClientes(){
    this.facturaServicio.getFacturas().subscribe((response:any)=>{
      this.facturas=response;
      console.log(response);
      this.dataSource.data=this.facturas
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
