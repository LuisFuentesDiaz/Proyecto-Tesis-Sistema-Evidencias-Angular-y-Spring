import { Criterio } from "./criterio";
import { Unidad } from "./Unidad";

export class Debilidad {

    id:number;
    codigo:string;
    nombre:string
    descripcion:string;
    estado:boolean;
    criterio:Criterio;
    unidad:Unidad;

    constructor(id:number,codigo:string,nombre:string,descripcion:string,estado:boolean,criterio:Criterio,unidad:Unidad){
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
        this.criterio = criterio;
        this.unidad = unidad;
    }



}
