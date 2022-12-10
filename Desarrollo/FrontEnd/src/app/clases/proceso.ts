export class Proceso {

    id:number;
    codigo:string;
    nombre_proceso:string;
    estado:boolean;
    
    constructor(id:number,codigo:string,nombre_proceso:string, estado:boolean){
        this.id = id;
        this.codigo = codigo;
        this.nombre_proceso = nombre_proceso;
        this.estado = estado;
    }
}
