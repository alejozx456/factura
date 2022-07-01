import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
