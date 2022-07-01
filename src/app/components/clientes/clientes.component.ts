import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/clientes';
import { ClienteServicioService } from 'src/app/services/cliente-servicio.service';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public columnsToDisplay = ['detalle','nombre','apellido','email','fechaNacimiento'];
  public dataSource:any=new MatTableDataSource();
  public clientes:Cliente[];

  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private clientesServicio:ClienteServicioService,public dialog:MatDialog,
   public router:Router ) { }

  ngOnInit(): void {
    this.getDataClientes();
  }

  getDataClientes(){
    this.clientesServicio.getClientes().subscribe((response:any)=>{
      this.clientes=response;
      console.log(response);
      this.dataSource.data=this.clientes;
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogDetalleCliente(cliente:Cliente){
   const dialogRef= this.dialog.open(DetalleClienteComponent,{
      width:'500px',
      height:'400px',
      data:cliente
      
      
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log('OK')
    })
  }

  openDialogCrearCliente(){
    const dialogRef= this.dialog.open(CrearClienteComponent,{
      width:'500px',
      height:'600px',
      
      
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log('OK')
      this.getDataClientes();
    
    })
  }

}
