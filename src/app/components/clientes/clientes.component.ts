import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/clientes';
import { ClienteServicioService } from 'src/app/services/cliente-servicio.service';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public columnsToDisplay = ['detalle','eliminar','nombre','apellido','email','fechaNacimiento'];
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

  deleteCliente(cliente:Cliente){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesServicio.delete(cliente.id).subscribe(response=>{
          this.clientes=this.clientes.filter(cli=>cli!==cliente)
          this.getDataClientes()
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `Cliente ${cliente.nombre} ${cliente.apellido} eliminado `,
            'success'
          )
        })
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El cliente no se borro',
          'error'
        )
      }
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
