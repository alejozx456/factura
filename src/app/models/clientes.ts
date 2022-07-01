import { Region } from "./region";
import { Venta } from "./venta";

export class Cliente{
    id:number=0;
    nombre:string='';
    apellido:string='';
    createAt:string='';
    email:string='';
    region:Region;
    facturas: Array<Venta>=[];
}