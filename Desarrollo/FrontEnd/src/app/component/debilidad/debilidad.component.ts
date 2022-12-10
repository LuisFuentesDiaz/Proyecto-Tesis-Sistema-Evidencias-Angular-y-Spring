import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Criterio } from 'src/app/clases/criterio';
import { Debilidad } from 'src/app/clases/debilidad';
import { Unidad } from 'src/app/clases/Unidad';
import { CriterioService } from 'src/app/servicios/criterio/criterio.service';
import { DebilidadService } from 'src/app/servicios/debilidad/debilidad.service';
import { UnidadService } from 'src/app/servicios/unidad/unidad.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-rol',
    templateUrl: './debilidad.component.html',
    styleUrls: ['./debilidad.component.css']
})
export class DebilidadComponent implements OnInit {
    @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

    debilidades: Debilidad[];
    criterios: Criterio[];
    unidades: Unidad[];
    filtroUser: string;
    nuevadebilidad: Debilidad;
    refomat: string;
    mostrar_boton = false;
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    estado: boolean;
    criterio: Criterio = null;
    unidad: Unidad = null;

    constructor(
        public debilidadServicio: DebilidadService,
        public criterioService: CriterioService,
        public unidaService: UnidadService,
    ) {
    }

    ngOnInit(): void {
        this.listarTodos();
        this.listarCriteriosTrue(true);
        this.listarUnidadesTrue(true);
    }

    actualizar(): void {
        this.nuevadebilidad = new Debilidad(this.id, this.codigo, this.nombre, this.descripcion, this.estado, this.criterio, this.unidad);
        this.debilidadServicio.actualizar(this.nuevadebilidad).subscribe(resp => {
            this.listarTodos();
            this.reset();
            Swal.fire('Guardado', `El ambito academico ${this.nuevadebilidad.nombre} ha sido creado con exito`, 'success');
            this.closeAddExpenseModal.nativeElement.click();
        })
    }

    eliminar(item: Debilidad): void {
        Swal.fire({
            title: '¿Seguro que desea eliminar?',
            text: "El nuevoAmbito : " + item.nombre + " sera eliminado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.debilidadServicio.eliminar(item.id).subscribe(resp => {
                    Swal.fire('Eliminado', `El nuevoAmbito: ${item.nombre} ha sido eliminada con exito`, 'success');
                    this.listarTodos();
                })
            }
        })
    }

    ver(entidad: Debilidad): void {
        this.id = entidad.id;
        this.codigo = entidad.codigo
        this.nombre = entidad.nombre;
        this.descripcion = entidad.descripcion;
        this.unidad = entidad.unidad;
        this.criterio = entidad.criterio
        this.estado = entidad.estado;
        this.mostrar_boton = true;
    }
    listarTodos(): void {
        this.debilidadServicio.listarTodos().subscribe(resp => {
            this.debilidades = resp;
            console.log(resp);
        })
    }

    listarCriteriosTrue(estado: boolean): void {
        this.criterioService.listarCriteriosEstado(estado).subscribe(resp => {
            this.criterios = resp;
        })
    }

    listarUnidadesTrue(estado: boolean): void {
        this.unidaService.listarUnidadesPorEstado(estado).subscribe(resp => {
            this.unidades = resp;
        })

    }

    create(): void {
        this.nuevadebilidad = new Debilidad(null, this.codigo, this.nombre, this.descripcion, true, this.criterio, this.unidad);
        console.log(this.nuevadebilidad);
        this.debilidadServicio.create(this.nuevadebilidad).subscribe(resp => {
            this.listarTodos();
            this.reset();
            Swal.fire('Guardado', `El nuevadebilidad ${this.nuevadebilidad.nombre} ha sido creado con exito`, 'success');
            this.closeAddExpenseModal.nativeElement.click();
        })
    }

    reset(): void {
        this.id = null;
        this.nombre = "";
        this.codigo = "";
        this.descripcion = "";
        this.unidad = null;
        this.criterio = null;
        this.mostrar_boton = false;
    }

    estadoEntrante(estadoentrante: boolean): string {
        if (estadoentrante == true) {
            this.refomat = "ACTIVO";
        } else if (estadoentrante == false) {
            this.refomat = "INACTIVO";
        }
        return this.refomat;
    }

    compare(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }
}


