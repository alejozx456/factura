import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/clientes';
import { Region } from 'src/app/models/region';
import { ClienteServicioService } from 'src/app/services/cliente-servicio.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  public cliente:Cliente=new Cliente();
  public regiones:Region[];
  

  constructor(private clienteService:ClienteServicioService,private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(){
    this.clienteService.getRegiones().subscribe(regiones=>this.regiones=regiones);
  }

  crearCliente(){
    this.clienteService.createClientes(this.cliente).subscribe(cliente=>{
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente Guardado',`Cliente ${cliente.nombre} creado con exito`,'success')

    })
  }
}
