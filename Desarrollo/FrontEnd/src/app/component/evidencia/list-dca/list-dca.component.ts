import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evidencia } from 'src/app/clases/evidencia';
import { EvidenciaService } from 'src/app/servicios/evidencia/evidencia.service';

@Component({
    selector: 'app-list-dca',
    templateUrl: './list-dca.component.html',
    styleUrls: ['./list-dca.component.css']
})
export class ListDcaComponent implements OnInit {

    evidencias: Evidencia[] = [];
    filtroUser: string;
    mostrar: number = 1;

    constructor(
        private evidenciaServicio: EvidenciaService,) { }

    ngOnInit(): void {
        this.listarEvidencias(1);
    }

    listarEvidencias(estado: number): void {
        this.evidencias = [];
        this.evidenciaServicio.buscarPorEstadoDac(estado).subscribe((resp) => {
            resp.forEach(data => {
                console.log(data)
                if (data.estadoResponsable != "Rechazado") {
                    this.evidencias.push(data);
                }
            })
        })
    }

    compare(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }
}
