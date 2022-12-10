import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AmbitoGeografico as Ambito } from 'src/app/clases/ambito-geografico';
import { AmbitoGeograficoService } from 'src/app/servicios/ambitoG/ambito-geografico.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-ambito-geografico',
    templateUrl: './ambito-geografico.component.html',
    styleUrls: ['./ambito-geografico.component.css']
})
export class AmbitoGeograficoComponent implements OnInit {
    ambitos: Ambito[]
    nuevoAmbito: Ambito

    id: number;
    nombre_ambito: string;
    estado: boolean;

    refomat: string;
    mostrar_boton: boolean;
    filtroUser: string;

    constructor(private ambitoService: AmbitoGeograficoService) { }
    @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

    ngOnInit(): void {
        this.listarTodos();
    }

    actualizar(): void {
        this.nuevoAmbito = new Ambito(this.id, this.nombre_ambito, this.estado);
        this.ambitoService.actualizar(this.nuevoAmbito).subscribe(resp => {
            this.listarTodos();
            this.reset();
            Swal.fire('Guardado', `El nuevoAmbito ${this.nuevoAmbito.nombre_ambito} ha sido creado con exito`, 'success');
            this.closeAddExpenseModal.nativeElement.click();

        })
    }

    eliminar(item: Ambito): void {
        Swal.fire({
            title: '¿Seguro que desea eliminar?',
            text: "El nuevoAmbito : " + item.nombre_ambito + " sera eliminado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {

                this.ambitoService.eliminar(item.id).subscribe(resp => {
                    Swal.fire('Eliminado', `El nuevoAmbito: ${item.nombre_ambito} ha sido eliminada con exito`, 'success');
                    this.listarTodos();
                })
            }
        })
    }

    ver(entidad: Ambito): void {
        this.id = entidad.id;
        this.nombre_ambito = entidad.nombre_ambito;
        this.estado = entidad.estado;
        this.mostrar_boton = true;
    }

    listarTodos(): void {
        this.ambitoService.listarTodos().subscribe(resp => {
            this.ambitos = resp;
        })
    }

    create(): void {
        this.nuevoAmbito = new Ambito(null, this.nombre_ambito, true);
        this.ambitoService.create(this.nuevoAmbito).subscribe(resp => {
            this.listarTodos();
            this.reset();
            Swal.fire('Guardado', `El nuevoAmbito ${this.nuevoAmbito.nombre_ambito} ha sido creado con exito`, 'success');
            this.closeAddExpenseModal.nativeElement.click();
        })
    }

    reset(): void {
        this.id = null;
        this.nombre_ambito = "";
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
}
