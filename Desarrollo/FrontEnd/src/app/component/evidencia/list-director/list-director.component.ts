import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evidencia } from 'src/app/clases/evidencia';
import { NuevoUsuario } from 'src/app/clases/nuevo-Usuario';
import { AuthService } from 'src/app/servicios/authentication/auth.service';
import { TokenService } from 'src/app/servicios/authentication/token.service';
import { EvidenciaService } from 'src/app/servicios/evidencia/evidencia.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-director',
    templateUrl: './list-director.component.html',
    styleUrls: ['./list-director.component.css']
})
export class ListDirectorComponent implements OnInit {

    evidencias: Evidencia[];
    usuario: NuevoUsuario;
    filtroUser: string;
    mostrar: number = 1;

    constructor(
        private evidenciaServicio: EvidenciaService,
        private usuarioService: AuthService,
        private token: TokenService) { }

    ngOnInit(): void {
        this.usuarioService.buscarPorEmail(this.token.getUserName()).subscribe(resp => {
            this.usuario = resp;
            if (this.usuario != null) {
                this.listarEvidencias(this.usuario.id, this.mostrar);
            }
        });
    }

    listarEvidencias(usuario: number, estado: number): void {
        this.evidencias = [];
        this.evidenciaServicio.listarPorUsuarioAndEstadoEnvio(usuario, estado).subscribe(resp => {
            resp.forEach((data) => {
                if (estado == 2) {
                    if (
                        data.estadoResponsable == 'Aprobado' &&
                        data.estadoDac == 'Aprobado'
                    ) {
                        this.evidencias.push(data);
                    }
                } else if (estado == 3) {
                    if (
                        data.estadoResponsable == 'Rechazado' ||
                        data.estadoDac == 'Rechazado'
                    ) {
                        this.evidencias.push(data);
                    }
                } else {
                    if (
                        data.estadoResponsable == 'En Espera' ||
                        data.estadoDac == 'En Espera'
                    ) {
                        this.evidencias.push(data);
                    }
                }
            });
        })
    }

    eliminar(id: number): void {
        this.evidenciaServicio.eliminar(id).subscribe(resp => {
            Swal.fire('Eliminado', `Eliminado correctamente`, 'success');
        })
    }

    compare(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }
}
