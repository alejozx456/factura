import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Venta } from 'src/app/models/venta';
import { FacturaServicioService } from 'src/app/services/factura-servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-factura',
  templateUrl: './lista-factura.component.html',
  styleUrls: ['./lista-factura.component.css']
})
export class ListaFacturaComponent implements OnInit {

  public columnsToDisplay = ['detalle','eliminar','id','descripcion','fecha','total'];
  public dataSource:any=new MatTableDataSource();
  public facturas:Venta[]

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



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
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
            case 'fecha':
                return new Date(item.createAt).getTime()

            default:
                return item[property]
        }
}

    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  delete(factura:Venta){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `Seguro que desea eliminar la Factura ${factura.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturaServicio.deleteFactura(factura.id).subscribe(response=>{
         this.getDataClientes()
          swalWithBootstrapButtons.fire(
            'Factura Eliminada!',
            `Factura ${factura.descripcion}  eliminada con exito `,
            'success'
          )
        })
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La factura no se borro',
          'error'
        )
      }
    })
  
    }

}
