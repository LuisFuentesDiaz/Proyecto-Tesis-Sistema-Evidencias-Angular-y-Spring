export class AmbitoAcademico {
  id: number;
  nombreAmbito: string;
  estado: boolean;

  constructor(id: number, nombreAmbito: string, estado: boolean) {
    this.id = id;
    this.nombreAmbito = nombreAmbito;
    this.estado = estado;
  }
}
