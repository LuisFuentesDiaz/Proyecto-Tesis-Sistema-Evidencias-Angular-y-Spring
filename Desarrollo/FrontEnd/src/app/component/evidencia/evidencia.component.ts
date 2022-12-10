import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AmbitoAcademico } from 'src/app/clases/ambito-academico';
import { AmbitoGeografico } from 'src/app/clases/ambito-geografico';
import { Criterio } from 'src/app/clases/criterio';
import { Debilidad } from 'src/app/clases/debilidad';
import { Evidencia } from 'src/app/clases/evidencia';
import { NuevoUsuario } from 'src/app/clases/nuevo-Usuario';
import { Proceso } from 'src/app/clases/proceso';
import { Registro } from 'src/app/clases/registro';
import { Unidad } from 'src/app/clases/Unidad';
import { AmbitoAcademicoService } from 'src/app/servicios/ambitoAcademico/ambito-academico.service';
import { AmbitoGeograficoService } from 'src/app/servicios/ambitoG/ambito-geografico.service';
import { AuthService } from 'src/app/servicios/authentication/auth.service';
import { TokenService } from 'src/app/servicios/authentication/token.service';
import { CriterioService } from 'src/app/servicios/criterio/criterio.service';
import { DebilidadService } from 'src/app/servicios/debilidad/debilidad.service';
import { EvidenciaService } from 'src/app/servicios/evidencia/evidencia.service';
import { ProcesoService } from 'src/app/servicios/proceso/proceso.service';
import { RegistroService } from 'src/app/servicios/registro/registro.service';
import { UnidadService } from 'src/app/servicios/unidad/unidad.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-evidencia',
    templateUrl: './evidencia.component.html',
    styleUrls: ['./evidencia.component.css'],
})
export class EvidenciaComponent implements OnInit {
    formulario: Evidencia;
    reenviar: boolean = false;
    permisoAdmin: boolean = false;
    permisoResponsable: boolean = false;
    permisoUsuario: boolean = false;
    permisoDca: boolean = false;
    permisoDirector: boolean = false;
    realRol: string[] = [];
    rol: string;
    isRol: boolean = false;
    ottro: boolean = false;
    roles = this.tokenService.getAuthorities();
    nombre: string;
    apellido: string;
    email: string;
    folio: string;
    evidencia: Evidencia;
    unidades: Unidad[];
    criterios: Criterio[];
    procesos: Proceso[];
    regristrs: Registro[];
    ambitoAcademicos: AmbitoAcademico[];
    ambitoGeograficos: AmbitoGeografico[];
    debilidades: Debilidad[];
    id: number;
    usuario: NuevoUsuario;
    unidad: Unidad;
    criterio: Criterio;
    proceso: Proceso;
    regristro: Registro;
    ambitoAcademico: AmbitoAcademico;
    ambitoGeografico: AmbitoGeografico;
    debilidade: Debilidad;
    descripcion: string;
    resultado: string;
    almacenamiento: string;
    presonaRelacionada: string;
    palabraClave: string;
    nombreCorto: string;
    responsable: NuevoUsuario;
    dca: NuevoUsuario = null;
    responsableEmail: string = null;
    observacionResponsable: string = null;
    observacionDac: string = null;
    numeroPlan: number;
    //asistentes internos
    autoridadesI: number = 0;
    administrativosI: number = 0;
    docentesI: number = 0;
    estudiantesI: number = 0;
    //asistentes externos
    autoridadesE: number = 0;
    administrativosE: number = 0;
    docentesE: number = 0;
    estudiantesE: number = 0;

    constructor(
        private tokeService: TokenService,
        private usuarioService: AuthService,
        private unidadService: UnidadService,
        private criterioService: CriterioService,
        private procesoService: ProcesoService,
        private registroService: RegistroService,
        private ambitoService: AmbitoAcademicoService,
        private ambitoGService: AmbitoGeograficoService,
        private debilidadService: DebilidadService,
        private evidenciaServicie: EvidenciaService,
        private tokenService: TokenService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        if (tokeService.getToken) {
            usuarioService
                .buscarPorEmail(tokeService.getUserName())
                .subscribe((resp) => {
                    this.nombre = resp.nombre;
                    this.apellido = resp.apellido;
                    this.email = resp.nombreUsuario;

                    if (this.route.snapshot.params.id) {
                        if (this.route.snapshot.params.id != false) {
                            this.VerEvidencia(this.route.snapshot.params.id);
                        }
                    }
                });
            usuarioService
                .buscarPorEmail(tokeService.getUserName())
                .subscribe((resp) => {
                    this.usuario = resp;
                });
        }
    }

    ngOnInit(): void {
        this.permisoUsuario = this.consultaRol(['user']);

        this.listarUnidades();
        this.listarProcesos();
        this.listarRegistro();
        this.listarAmbito();
        this.listarAmbitoG();
        this.listarCriterio();

        if (this.usuario == null) {
            this.usuarioService
                .buscarPorEmail(this.tokeService.getUserName())
                .subscribe((resp) => {
                    this.usuario = resp;
                });
        }
    }

    VerEvidencia(evidencia: number): void {
        this.evidenciaServicie.buscarPorId(evidencia).subscribe((resp) => {
            this.listarDebilidad(resp.criterio.id);
            this.usuario = resp.usuario;
            this.responsable = resp.responsable;
            this.dca = resp.dca;
            this.id = resp.id;
            this.unidad = resp.unidad;
            this.proceso = resp.proceso;
            this.regristro = resp.registro;
            this.ambitoAcademico = resp.ambito_a;
            this.ambitoGeografico = resp.ambito_g;
            this.criterio = resp.criterio;
            this.debilidade = resp.debilidad;
            this.descripcion = resp.descripcion;
            this.resultado = resp.resultado;
            this.almacenamiento = resp.almacenamiento;
            this.presonaRelacionada = resp.personaRelacionada;
            this.palabraClave = resp.palabraclave;
            this.presonaRelacionada = resp.personaRelacionada;
            this.numeroPlan = resp.nplanmejora;
            this.nombreCorto = resp.nombrecorto;
            this.observacionResponsable = resp.observaciones_r;
            this.observacionDac = resp.observaciones_d;

            //asistentes internos
            this.autoridadesI = resp.autoridadesI;
            this.administrativosI = resp.administrativosI;
            this.docentesI = resp.docentesI;
            this.estudiantesI = resp.estudiantesI;
            //asistentes externos
            this.autoridadesE = resp.autoridadesE;
            this.administrativosE = resp.administrativosE;
            this.docentesE = resp.docentesE;
            this.estudiantesE = resp.estudiantesE;
            this.reenviar = true;
        });
    }

    listarUnidades() {
        this.unidadService.listarUnidadesPorEstado(true).subscribe((resp) => {
            this.unidades = resp;
        });
    }

    listarProcesos() {
        this.procesoService.listarprocesosPorEsatado(true).subscribe((resp) => {
            this.procesos = resp;
        });
    }

    listarRegistro() {
        this.registroService.listarprocesosPorEstado(true).subscribe((resp) => {
            this.regristrs = resp;
        });
    }

    listarAmbito() {
        this.ambitoService.listarPorEstado(true).subscribe((resp) => {
            this.ambitoAcademicos = resp;
        });
    }

    listarAmbitoG() {
        this.ambitoGService.listarPorEstado(true).subscribe((resp) => {
            this.ambitoGeograficos = resp;
        });
    }

    listarCriterio() {
        this.criterioService.listarCriteriosEstado(true).subscribe((resp) => {
            this.criterios = resp;
        });
    }

    listarDebilidad(criterio: number) {
        this.debilidadService.listarTodosPorCriterio(criterio).subscribe((resp) => {
            this.debilidades = resp;
        });
    }

    actualizar(): void {
        this.folio =
            this.unidad.codigo +
            '-' +
            this.proceso.codigo +
            '-' +
            this.criterio.codigo;

        this.evidencia = new Evidencia(
            this.id,
            this.folio,
            this.descripcion,
            this.resultado,
            this.almacenamiento,
            this.presonaRelacionada,
            this.palabraClave,
            this.nombreCorto,
            'En Espera',
            this.observacionResponsable,
            this.observacionDac,
            this.usuario,
            null,
            null,
            this.debilidade,
            this.unidad,
            this.regristro,
            this.ambitoAcademico,
            this.ambitoGeografico,
            this.proceso,
            this.criterio,
            this.numeroPlan,
            'En Espera',
            'En Espera',
            this.autoridadesI,
            this.administrativosI,
            this.docentesI,
            this.estudiantesI,
            this.autoridadesE,
            this.administrativosE,
            this.docentesE,
            this.estudiantesE
        );

        console.log(this.evidencia);
        this.evidenciaServicie.actualizar(this.evidencia).subscribe((resp) => {
            Swal.fire(
                'Guardado',
                `La evidencia ${this.evidencia.codigo} ha sido reenviada con exito`,
                'success'
            );
        });
    }

    guardar(): void {
        this.folio =
            this.unidad.codigo +
            '-' +
            this.proceso.codigo +
            '-' +
            this.criterio.codigo;
        this.evidencia = new Evidencia(
            null,
            this.folio,
            this.descripcion,
            this.resultado,
            this.almacenamiento,
            this.presonaRelacionada,
            this.palabraClave,
            this.nombreCorto,
            'En Espera',
            this.observacionResponsable,
            this.observacionDac,
            this.usuario,
            this.responsable,
            this.dca,
            this.debilidade,
            this.unidad,
            this.regristro,
            this.ambitoAcademico,
            this.ambitoGeografico,
            this.proceso,
            this.criterio,
            this.numeroPlan,
            'En Espera',
            'En Espera',
            this.autoridadesI,
            this.administrativosI,
            this.docentesI,
            this.estudiantesI,
            this.autoridadesE,
            this.administrativosE,
            this.docentesE,
            this.estudiantesE
        );

        this.evidenciaServicie.create(this.evidencia).subscribe((resp) => {
            Swal.fire(
                'Guardado',
                `La evidencia ${this.evidencia.codigo} ha sido creado con exito`,
                'success'
            );
            this.router.navigate(['/evidencia']);
        });
        console.log(this.evidencia);
    }

    consultaRol(expectedRol: string[]): boolean {
        this.realRol = [];
        this.isRol = false;

        this.roles.forEach((rol) => {
            if (rol == 'ROLE_ADMIN') {
                this.realRol.push('admin');
            } else if (rol == 'ROLE_DCA') {
                this.realRol.push('dca');
            } else if (rol == 'ROLE_DIRECCION_DE_DOCENCIA') {
                this.realRol.push('director_docencia');
            } else if (rol == 'ROLE_RESPONSABLE') {
                this.realRol.push('responsable');
            } else if (rol == 'ROLE_USER') {
                this.realRol.push('user');
            }
        });

        expectedRol.forEach((real) => {
            if (this.realRol.indexOf(real) != -1) {
                this.isRol = true;
            } else {
                this.isRol = false;
            }
        });
        return this.isRol;
    }

    compare(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }
}
