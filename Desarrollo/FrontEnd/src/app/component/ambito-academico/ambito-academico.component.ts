import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AmbitoAcademico as Ambito } from 'src/app/clases/ambito-academico';
import { AmbitoAcademicoService } from 'src/app/servicios/ambitoAcademico/ambito-academico.service';
import { FuncionesService } from 'src/app/servicios/funcionesbasicas/funciones.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-ambito-academico',
    templateUrl: './ambito-academico.component.html',
    styleUrls: ['./ambito-academico.component.css']
})
export class AmbitoAcademicoComponent implements OnInit {
    @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

    id: number;
    nombreAmbito: string;
    estado: boolean;
    ambitos: Ambito[];
    nuevoAmbito: Ambito;
    refomat: string;
    mostrar_boton: boolean;
    filtroUser: string;

    constructor(private ambitoService: AmbitoAcademicoService) { }

    ngOnInit(): void {
        this.listarTodos();
    }

    actualizar(): void {
        this.nuevoAmbito = new Ambito(this.id, this.nombreAmbito, this.estado);
        this.ambitoService.actualizar(this.nuevoAmbito).subscribe(resp => {
            this.listarTodos();
            this.reset();
            Swal.fire('Guardado', `El ambito academico ${this.nuevoAmbito.nombreAmbito} ha sido creado con exito`, 'success');
            this.closeAddExpenseModal.nativeElement.click();

        })
    }

    eliminar(item: Ambito): void {
        Swal.fire({
            title: '¿Seguro que desea eliminar?',
            text: "El nuevoAmbito : " + item.nombreAmbito + " sera eliminado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.ambitoService.eliminar(item.id).subscribe(resp => {
                    Swal.fire('Eliminado', `El nuevoAmbito: ${item.nombreAmbito} ha sido eliminada con exito`, 'success');

                    this.listarTodos();

                })
            }
        })
    }

    ver(entidad: Ambito): void {
        this.id = entidad.id;
        this.nombreAmbito = entidad.nombreAmbito;
        this.estado = entidad.estado;
        this.mostrar_boton = true;
    }

    listarTodos(): void {
        this.ambitoService.listarTodos().subscribe(resp => {
            this.ambitos = resp;
        })
    }

    create(): void {
        this.nuevoAmbito = new Ambito(null, this.nombreAmbito, true);
        this.ambitoService.create(this.nuevoAmbito).subscribe(resp => {
            this.listarTodos();
            this.reset();
            Swal.fire('Guardado', `El nuevoAmbito ${this.nuevoAmbito.nombreAmbito} ha sido creado con exito`, 'success');
            this.closeAddExpenseModal.nativeElement.click();
        })
    }

    reset(): void {
        this.id = null;
        this.nombreAmbito = "";
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
