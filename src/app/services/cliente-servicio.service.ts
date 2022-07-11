import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Cliente } from '../models/clientes';
import { Region } from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class ClienteServicioService {

private urlEndPoint:string='http://localhost:8080/api/clientes';
private httpHeaders= new HttpHeaders({
  'Content-type': 'application/json'
});

  constructor(private htttp:HttpClient,private router:Router) { }

  getClientes():Observable<Cliente[]>{
    return this.htttp.get<Cliente[]>(this.urlEndPoint);
  }

  getRegiones():Observable<Region[]>{
    return this.htttp.get<Region[]>(this.urlEndPoint+'/regiones');
  }

  createClientes(cliente:Cliente):Observable<Cliente>{
    return  this.htttp.post(this.urlEndPoint,cliente,{headers:this.httpHeaders})
    .pipe(
      map((response:any)=>response.cliente as Cliente)
    );
  }

  delete(id:number):Observable<Cliente>{
    return this.htttp.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders})
  }
} 
