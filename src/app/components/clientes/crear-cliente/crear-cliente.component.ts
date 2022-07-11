import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/clientes';
import { Region } from 'src/app/models/region';
import { ClienteServicioService } from 'src/app/services/cliente-servicio.service';
import Swal from 'sweetalert2';
import { toast } from 'toast-notification-alert'


@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  public cliente:Cliente=new Cliente();
  public regiones:Region[];
  

  constructor(private clienteService:ClienteServicioService,private router:Router,
    private activatedRoute:ActivatedRoute,public dialogRef: MatDialogRef<CrearClienteComponent>) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(){
    this.clienteService.getRegiones().subscribe(regiones=>this.regiones=regiones);
  }

  crearCliente(){
    if(this.cliente.nombre==""){
      //Swal.fire('Falta un campo','Insertar Nombre','error')
      toast.show({
        title: 'Error',
        message: 'insertar nombre',
        type: 'alert',
        newestOnTop: false
      })
    }else if(this.cliente.apellido==""){
      //Swal.fire('Falta un campo','Insertar Apellido','error')
      toast.show({
        title: 'Error',
        message: 'Insertar Apellido',
        type: 'alert',
        newestOnTop: false
      })
    }else if(this.cliente.email==""){
      //Swal.fire('Falta un campo','Insertar email','error')
      toast.show({
        title: 'Error',
        message: 'Insertar Email',
        type: 'alert',
        newestOnTop: false
      })
    }else if(this.cliente.createAt==""){
      //Swal.fire('Falta un campo','Insertar Fecha Nacimiento','error')
      toast.show({
        title: 'Error',
        message: 'Elegir Fecha Nacimiento',
        type: 'alert',
        newestOnTop: false
      })
    }
    else if(this.cliente.region==null){
      //Swal.fire('Falta un campo','Insertar Provincia','error')
        toast.show({
          title: 'Error',
          message: 'Elegir Provincia',
          type: 'alert',
          newestOnTop: false
        })
    }
    else{
      this.clienteService.createClientes(this.cliente).subscribe(cliente=>{
        this.router.navigate(['/clientes'])
        this.dialogRef.close()
        Swal.fire('Cliente Guardado',`Cliente ${cliente.nombre} creado con exito`,'success')
  
      })
    }
    }
    
}
