export class AmbitoGeografico {
    id:number;
    nombre_ambito:string;
    estado:boolean;

    constructor(id:number,nombre:string,estado:boolean){
        this.id = id;
        this.nombre_ambito = nombre;
        this.estado = estado;
    }
}
