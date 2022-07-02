import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/clientes';
import { ClienteServicioService } from 'src/app/services/cliente-servicio.service';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.css']
})
export class BuscarClienteComponent implements OnInit {

  public columnsToDisplay = ['elegir','nombre','apellido','email'];
  public dataSource:any=new MatTableDataSource();
  public clientes:Cliente[];

  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private clientesServicio:ClienteServicioService,public dialog:MatDialog,
    public router:Router,private dialogRef: MatDialogRef<BuscarClienteComponent>) { }

  ngOnInit(): void {
    this.getDataClientes()
  }
  getDataClientes(){
    this.clientesServicio.getClientes().subscribe((response:any)=>{
      this.clientes=response;
      console.log(response);
      this.dataSource.data=this.clientes;
      this.dataSource.paginator = this.paginator;
    })
  }

  mandarDatos(cliente:Cliente){
    this.dialogRef.close(cliente)
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
