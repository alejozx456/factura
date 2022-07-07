import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class FacturaServicioService {

  private urlEndPoint:string='http://localhost:8080/api/facturas';
  private httpHeaders= new HttpHeaders({
    'Content-type': 'application/json'
  });

  constructor(private http:HttpClient) { }

  getFactura(id:number):Observable<Venta>{
    return this.http.get<Venta>(`${this.urlEndPoint}/${id}`);
  }
  createFactura(factura:Venta):Observable<Venta>{
    return this.http.post(this.urlEndPoint,factura,{headers:this.httpHeaders}).pipe(
      map((response:any)=>response.factura as Venta)
     
    );
  }
  getFacturas():Observable<Venta[]>{
    return this.http.get<Venta[]>(this.urlEndPoint);
  }
 
}
