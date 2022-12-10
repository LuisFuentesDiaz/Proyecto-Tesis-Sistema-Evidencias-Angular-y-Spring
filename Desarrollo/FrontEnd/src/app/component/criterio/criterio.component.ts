import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Criterio } from 'src/app/clases/criterio';
import { CriterioService } from 'src/app/servicios/criterio/criterio.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-criterio',
    templateUrl: './criterio.component.html',
    styleUrls: ['./criterio.component.css']
})
export class CriterioComponent implements OnInit {
    @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

    criterios: Criterio[];
    mostrar_boton: boolean = false;

    id: number = null;
    codigo: string;
    nombre: string;
    descripcion: string;
    explicacion: string;
    refomat: string;
    filtroUser: string;

    criterio: Criterio;
    estado: boolean = null;

    constructor(
        private CriterioService: CriterioService,
    ) { }

    ngOnInit(): void {
        this.listarCriterios();
    }

    create(): void {
        this.criterio = new Criterio(this.id, this.codigo, this.nombre, this.descripcion, this.explicacion, true);
        this.CriterioService.create(this.criterio).subscribe(resp => {
            this.listarCriterios();
            this.reset();
            console.log(this.criterio);
            Swal.fire('Guardado', `El criterio ${this.criterio.nombre} ha sido creado con exito`, 'success');
            this.closeAddExpenseModal.nativeElement.click();
        })
    }


    actualizar(): void {
        this.criterio = new Criterio(this.id, this.codigo, this.nombre, this.descripcion, this.explicacion, this.estado);
        this.CriterioService.actualizar(this.criterio).subscribe(resp => {
            this.listarCriterios();
            this.reset();
            Swal.fire('Actualizado', `El criterio  ${this.criterio.nombre} ha sido creado con exito`, 'success');
            this.closeAddExpenseModal.nativeElement.click();
        })
    }

    listarCriterios() {
        this.CriterioService.listarCriterios().subscribe(resp => {
            this.criterios = resp;
        })
    }

    ver(criterio: Criterio) {
        this.id = criterio.id;
        this.codigo = criterio.codigo;
        this.nombre = criterio.nombre;
        this.descripcion = criterio.descripcion;
        this.explicacion = criterio.explicacion;
        this.estado = criterio.estado;
        this.mostrar_boton = true;
    }

    reset(): void {
        this.id = null;
        this.nombre = "";
        this.codigo = "";
        this.explicacion = "";
        this.descripcion = "";
        this.estado = null;
        this.mostrar_boton = false;
    }

    estadoEntrante(estado_unidad: boolean): string {
        if (estado_unidad == true) {
            this.refomat = "ACTIVO";
        } else if (estado_unidad == false) {
            this.refomat = "INACTIVO";
        }
        return this.refomat;
    }

    eliminar(criterio: Criterio): void {
        Swal.fire({
            title: '¿Seguro que desea eliminar?',
            text: "La unidad con el codigo: " + criterio.codigo + " sera eliminado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.CriterioService.eliminar(criterio.id).subscribe(resp => {
                    Swal.fire('Eliminado', `La unidad: ${criterio.codigo} ha sido eliminada con exito`, 'success');
                    this.listarCriterios();
                })
            }
        })
    }
}
