import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServicioService {
  private urlEndPoint:string='http://localhost:8080/api/productos';
  private httpHeaders= new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private htttp:HttpClient,private router:Router) { }

  getProductos():Observable<Producto[]>{
    return this.htttp.get<Producto[]>(this.urlEndPoint);
  }
}
