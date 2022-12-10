export class Criterio {

    id : number;
    codigo:string;
    nombre:string;
    descripcion : string;
    explicacion :string;
    estado : boolean;

        constructor(id : number, codigo: string ,nombre:string ,descripcion: string, explicacion:string , estado : boolean){
            this.id=id;
            this.codigo = codigo;
            this.nombre = nombre;
            this.descripcion = descripcion;
            this.explicacion = explicacion;
            this.estado = estado;
        }

}
