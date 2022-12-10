export class Registro {
    id: number;
    tipo_registro: string;
    estado: boolean;

    constructor(id: number, tipoRegistro: string, estado: boolean) {
        this.id = id;
        this.tipo_registro = tipoRegistro;
        this.estado = estado;
    }

}
