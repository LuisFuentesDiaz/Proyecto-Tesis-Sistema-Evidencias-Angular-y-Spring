import { AmbitoAcademico } from './ambito-academico';
import { AmbitoGeografico } from './ambito-geografico';
import { Criterio } from './criterio';
import { Debilidad } from './debilidad';
import { NuevoUsuario } from './nuevo-Usuario';
import { Proceso } from './proceso';
import { Registro } from './registro';
import { Unidad } from './Unidad';

export class Evidencia {
  id: number;
  codigo: string;
  descripcion: string;
  resultado: string;
  almacenamiento: string;
  personaRelacionada: string;
  palabraclave: string;
  nombrecorto: string;
  estado: string;
  observaciones_r: string;
  observaciones_d: string;
  usuario: NuevoUsuario;
  responsable: NuevoUsuario;
  dca: NuevoUsuario;
  debilidad: Debilidad;
  unidad: Unidad;
  registro: Registro;
  ambito_a: AmbitoAcademico;
  ambito_g: AmbitoGeografico;
  proceso: Proceso;
  criterio: Criterio;
  nplanmejora: number;
  estadoResponsable: string;
  estadoDac: string;

  autoridadesI: number;
  administrativosI: number;
  docentesI: number;
  estudiantesI: number;

  autoridadesE: number;
  administrativosE: number;
  docentesE: number;
  estudiantesE: number;

  fecha: Date;

  constructor(
    id: number,
    codigo: string,
    descripcion: string,
    resultado: string,
    almacenamiento: string,
    personaRelacionada: string,
    palabraclave: string,
    nombreCorto: string,
    estado: string,
    observaciones_r: string,
    observaciones_d: string,
    usuario: NuevoUsuario,
    responsable: any,
    dca: any,
    debilidad: Debilidad,
    unidad: Unidad,
    registro: Registro,
    ambito_a: AmbitoAcademico,
    ambito_g: AmbitoGeografico,
    proceso: Proceso,
    criterio: Criterio,
    numeroPlan: number,
    estadoResponsable: string,
    estadoDac: string,
    autoridades: number,
    administrativos: number,
    docentes: number,
    estudiantes: number,
    autoridadesE: number,
    administrativosE: number,
    docentesE: number,
    estudiantesE: number
  ) {
    this.id = id;
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.resultado = resultado;
    this.almacenamiento = almacenamiento;
    this.palabraclave = palabraclave;
    this.estado = estado;
    this.observaciones_r = observaciones_r;
    this.observaciones_d = observaciones_d;
    this.usuario = usuario;
    this.responsable = responsable;
    this.debilidad = debilidad;
    this.unidad = unidad;
    this.registro = registro;
    this.ambito_a = ambito_a;
    this.ambito_g = ambito_g;
    this.proceso = proceso;
    this.criterio = criterio;
    this.nplanmejora = numeroPlan;
    this.nombrecorto = nombreCorto;
    this.dca = dca;
    this.personaRelacionada = personaRelacionada;
    this.estadoResponsable = estadoResponsable;
    this.estadoDac = estadoDac;
    this.autoridadesI = autoridades;
    this.administrativosI = administrativos;
    this.docentesI = docentes;
    this.estudiantesI = estudiantes;

    this.autoridadesE = autoridadesE;
    this.administrativosE = administrativosE;
    this.docentesE = docentesE;
    this.estudiantesE = estudiantesE;
  }
}
