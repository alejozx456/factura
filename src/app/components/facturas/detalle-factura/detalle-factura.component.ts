import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Venta } from 'src/app/models/venta';
import { FacturaServicioService } from 'src/app/services/factura-servicio.service';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {

  factura:Venta;
  public columnsToDisplay = ['producto','precio','cantidad','total'];
  public dataSource:any=new MatTableDataSource();

  constructor(private activatedRoute:ActivatedRoute,private facturasService:FacturaServicioService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.activatedRoute.paramMap.subscribe(params=>{
      let id =+params.get('id');
      this.facturasService.getFactura(id).subscribe(factura=>{
        this.factura=factura
        this.dataSource=this.factura.items
        console.log(this.dataSource)
      })

    })
  }

}
