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
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Columns, Img, PdfMakeWrapper, Stack, Table, Ul } from 'pdfmake-wrapper';

@Component({
    selector: 'app-ver-dca',
    templateUrl: './ver-dca.component.html',
    styleUrls: ['./ver-dca.component.css']
})
export class VerDcaComponent implements OnInit {

    permisoAdmin: boolean = false;
    permisoResponsable: boolean = false;
    permisoUsuario: boolean = false;
    permisoDca: boolean = false;
    permisoDirector: boolean = false;
    onlyRead: boolean = false;
    realRol: string[] = [];
    rol: string;
    isRol: boolean = false;
    ottro: boolean = false;
    roles = this.tokenService.getAuthorities();
    estado: string;
    nombre: string;
    apellido: string;
    email: string;
    folio: string;
    fecha: Date;
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
    ) { }

    ngOnInit(): void {
        this.permisoDca = false;
        this.permisoDca = this.consultaRol(['dca']);

        if (this.route.snapshot.params.id) {
            this.VerEvidencia(this.route.snapshot.params.id)
        }

        this.listarUnidades();
        this.listarProcesos();
        this.listarRegistro();
        this.listarAmbito();
        this.listarAmbitoG();
        this.listarCriterio();
    }

    consultaRol(expectedRol: string[]): boolean {
        this.realRol = [];
        this.isRol = false;

        this.roles.forEach(rol => {

            if (rol == "ROLE_ADMIN") {
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

        expectedRol.forEach(real => {
            if (this.realRol.indexOf(real) != -1) {
                this.isRol = true;
            } else {
                this.isRol = false;
            }
        })
        return this.isRol;
    }

    listarUnidades() {
        this.unidadService.listarUnidadesPorEstado(true).subscribe(resp => {
            this.unidades = resp;
        })
    }

    listarProcesos() {
        this.procesoService.listarprocesosPorEsatado(true).subscribe(resp => {
            this.procesos = resp;
        })
    }

    listarRegistro() {
        this.registroService.listarprocesosPorEstado(true).subscribe(resp => {
            this.regristrs = resp;
        })
    }

    listarAmbito() {
        this.ambitoService.listarPorEstado(true).subscribe(resp => {
            this.ambitoAcademicos = resp;
        })
    }

    listarAmbitoG() {
        this.ambitoGService.listarPorEstado(true).subscribe(resp => {
            this.ambitoGeograficos = resp;
        })
    }

    listarCriterio() {
        this.criterioService.listarCriteriosEstado(true).subscribe(resp => {
            this.criterios = resp;
        })
    }

    listarDebilidad(criterio: number) {
        this.debilidadService.listarTodosPorCriterio(criterio).subscribe(resp => {
            this.debilidades = resp;
        })
    }

    VerEvidencia(evidencia: number): void {
        this.evidenciaServicie.buscarPorId(evidencia).subscribe(resp => {
            console.log();
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
            this.estado = resp.estadoDac;
            this.folio = resp.codigo;
            this.fecha = resp.fecha;

            if (resp.estadoDac == "En Espera") {
                this.onlyRead = false;
            } else {
                this.onlyRead = true;
            }

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

            if (this.dca == null) {
                this.usuarioService.buscarPorEmail(this.tokeService.getUserName()).subscribe(resp => {
                    this.dca = resp;
                })
            }
        })
    }

    compare(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    aprobarResponsable(): void {
        this.evidencia = new Evidencia(this.id, this.folio, this.descripcion, this.resultado, this.almacenamiento, this.presonaRelacionada, this.palabraClave, this.nombreCorto, 'Aprobado',
            this.observacionResponsable, this.observacionDac, this.usuario, this.responsable, this.dca, this.debilidade, this.unidad, this.regristro, this.ambitoAcademico,
            this.ambitoGeografico, this.proceso, this.criterio, this.numeroPlan, 'Aprobado', 'Aprobado', this.autoridadesI, this.administrativosI, this.docentesI, this.estudiantesI, this.autoridadesE,
            this.administrativosE, this.docentesE, this.estudiantesE);
        console.log(this.evidencia);
        this.evidenciaServicie.actualizar(this.evidencia).subscribe(resp => {
            Swal.fire('Guardado', `La evidencia ${this.evidencia.codigo} ha sido aprobada con exito`, 'success');
            this.router.navigate(['/evidencia-dca']);
        });
    }

    RechazarResponsable(): void {
        if (this.observacionDac == null) {
            Swal.fire('Alerta', `Agregue una observacion`, 'warning');
        }
        else {
            this.evidencia = new Evidencia(this.id, this.folio, this.descripcion, this.resultado, this.almacenamiento, this.presonaRelacionada, this.palabraClave, this.nombreCorto, 'Rechazado por dca',
                this.observacionResponsable, this.observacionDac, this.usuario, this.responsable, this.dca, this.debilidade, this.unidad, this.regristro, this.ambitoAcademico,
                this.ambitoGeografico, this.proceso, this.criterio, this.numeroPlan, 'Aprobado', 'Rechazado', this.autoridadesI, this.administrativosI, this.docentesI, this.estudiantesI, this.autoridadesE,
                this.administrativosE, this.docentesE, this.estudiantesE);
            console.log(this.evidencia);
            this.evidenciaServicie.actualizar(this.evidencia).subscribe(resp => {
                Swal.fire('Guardado', `La evidencia ${this.evidencia.codigo} ha sido Rechazada`, 'success');
                this.router.navigate(['/evidencia-dca']);
            });
        }
    }

    async pdf() {
        PdfMakeWrapper.setFonts(pdfFonts);
        const pdf = new PdfMakeWrapper();
        pdf.header(
            pdf.add(
                await new Img('http://localhost:4200/assets/imagenes/head_1evidencia.png').build()
            ))

        pdf.add(
            new Table([
                ['Folio : ', this.folio.trim(), 'Fecha:  ', this.fecha],
                [' ', '', '  ', ''],

            ]).widths(['*', '*', '*', '*']).layout("noBorders").end
        )

        pdf.add(
            new Table([
                ['Usuario : ', this.usuario.rut, 'Email :  ', this.usuario.nombreUsuario],
                [' ', '', '  ', ''],

            ]).widths(['*', '*', '*', '*']).layout("noBorders").end
        )

        pdf.add(
            new Table([
                ['Unidad : ', this.unidad.nombre],
                ['Proceso ', this.unidad.nombre],
                ['Tipo De Registro ', this.regristro.tipo_registro],
                ['N° Plan de mejora ', this.numeroPlan],
                ['Ambito Academico ', this.ambitoAcademico.nombreAmbito],
                ['Ambito Geografico ', this.ambitoGeografico.nombre_ambito],
                ['Criterio ', this.criterio.nombre],
                ['Debilidad ', this.debilidade.nombre],
            ]).widths(['*', '*']).end
        )

        pdf.add(
            new Table([
                [' ', '', '  ', ''],
            ]).widths(['*', '*', '*', '*']).layout("noBorders").end
        )

        pdf.add(
            new Table([
                ['Descripcion : ', this.descripcion],
                ['Resultado ', this.resultado],
                ['Personas relacionadas ', this.presonaRelacionada],
                ['Palabra Clave ', this.palabraClave],
                ['Nombre corto', this.nombreCorto],
                ['Criterio ', this.criterio.nombre],
                ['Debilidad ', this.debilidade.nombre],
            ]).widths(['*', '*']).end
        )

        pdf.add(
            new Table([
                [' ', '', '  ', ''],
            ]).widths(['*', '*', '*', '*']).layout("noBorders").end
        )

        pdf.add(
            new Columns(['Responsable: ', this.responsable.rut, 'Email: ', this.responsable.nombreUsuario]).end
        )
        pdf.add(
            new Table([
                ['Observacion Responsable', this.observacionResponsable],
            ]).widths(['*', '*']).end
        )

        pdf.add(
            new Table([
                [' ', '', '  ', ''],

            ]).widths(['*', '*', '*', '*']).layout("noBorders").end
        )

        if (this.dca != null) {
            pdf.add(
                new Columns(['DCA: ', this.dca.rut, 'Email: ', this.dca.nombreUsuario]).end
            )
            pdf.add(
                new Table([
                    ['Observacion DCA', this.observacionDac],
                ]).widths(['*', '*']).end
            )
        }

        pdf.add(
            new Table([
                [' ', '', '  ', ''],

            ]).widths(['*', '*', '*', '*']).layout("noBorders").end
        )

        pdf.add(
            new Table([
                ['Autoridades Internas', this.autoridadesI, 'Autoridades Externos', this.autoridadesE],
                ['Administrativos Internos', this.administrativosI, 'Administrativos Externos', this.administrativosE],
                ['Docentes Internos', this.docentesI, 'Docentes Externos', this.docentesE],
                ['Estudiantes Internos', this.estudiantesI, 'Estudiantes Externos', this.estudiantesE],

            ]).widths(['*', '*', '*', '*']).end
        )
        pdf.create().open();
    }
}
