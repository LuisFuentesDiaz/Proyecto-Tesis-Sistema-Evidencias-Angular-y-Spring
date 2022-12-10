export class Unidad{
    id: number;
    codigo:string;
    nombre: string;  
    estado:boolean;

    constructor(id:number, codigo:string, nombre:string, estado:boolean){
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.estado = estado;
    }
}