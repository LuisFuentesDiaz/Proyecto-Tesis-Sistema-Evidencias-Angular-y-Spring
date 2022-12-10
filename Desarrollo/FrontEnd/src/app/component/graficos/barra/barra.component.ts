import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { EvidenciaService } from 'src/app/servicios/evidencia/evidencia.service';
import { UnidadService } from 'src/app/servicios/unidad/unidad.service';
import { DatePipe } from "@angular/common";
import { CargarScriptsService } from 'src/app/cargar-scripts.service';

@Component({
    selector: 'app-barra',
    templateUrl: './barra.component.html',
    styleUrls: ['./barra.component.css'],
    providers: [DatePipe]

})
export class BarraComponent implements OnInit {

    toggle1: boolean = false;
    toggle2: boolean = false;

    toggleA1() {
        if (this.toggle1 == false) {
            this.toggle1 = true;
        } else {
            this.toggle1 = false;
        }
    }

    toggleA2() {
        if (this.toggle2 == false) {
            this.toggle2 = true;
        } else {
            this.toggle2 = false;
        }
    }

    constructor(private evidenciaService: EvidenciaService,
        private datePipe: DatePipe,
        private cargaScripts: CargarScriptsService,
    ) {
        cargaScripts.carga(["print/print"]);

        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
    }

    ngOnInit(): void {
        this.transformDate();
    }

    habilitado: boolean = true;
    mesesEvidencias: string[] = [];
    evidenciasPorMes: number[] = [];
    anos: number[] = [];
    ano: number = 2021;

    fecha1: string;
    fecha2: string;

    transformDate() {
        this.fecha1 = this.datePipe.transform(new Date, "yyyy-MM-dd");
        this.fecha2 = this.datePipe.transform(new Date, "yyyy-MM-dd");

        this.mesPorEvidencias(this.fecha1, this.fecha2);
    }

    public barChartOptions: ChartOptions = {
        responsive: true,

    };

    public barChartLabels = this.mesesEvidencias;
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];
    public barChartData: ChartDataSets[] = [
        { data: this.evidenciasPorMes, label: 'Evidencias' }
    ];

    mesPorEvidencias(fecha1: string, fecha2: string): void {
        this.mesesEvidencias.length = 0;
        this.evidenciasPorMes.length = 0;

        this.evidenciaService.buscarEvidenciasEntreFechas(fecha1, fecha2).subscribe(resp => {
            resp.forEach(res => {

                if (res[0] == 1) {
                    this.mesesEvidencias.push("Enero")
                    this.evidenciasPorMes.push(res[1])

                }
                if (res[0] == 2) {
                    this.mesesEvidencias.push("Febrero")
                    this.evidenciasPorMes.push(res[1])

                }
                if (res[0] == 3) {
                    this.mesesEvidencias.push("Marzo")
                    this.evidenciasPorMes.push(res[1])

                }
                if (res[0] == 4) {
                    this.mesesEvidencias.push("Abril")
                    this.evidenciasPorMes.push(res[1])

                }
                if (res[0] == 5) {
                    this.mesesEvidencias.push("Mayo")
                    this.evidenciasPorMes.push(res[1])

                }
                if (res[0] == 6) {
                    this.mesesEvidencias.push("Junio")
                    this.evidenciasPorMes.push(res[1])

                }
                if (res[0] == 7) {
                    this.mesesEvidencias.push("Julio")
                    this.evidenciasPorMes.push(res[1])

                }
                if (res[0] == 8) {
                    this.mesesEvidencias.push("Agosto")
                    this.evidenciasPorMes.push(res[1])

                }
                if (res[0] == 9) {
                    this.mesesEvidencias.push("Septiembre")
                    this.evidenciasPorMes.push(res[1])

                }
                if (res[0] == 10) {
                    this.mesesEvidencias.push("Octubre")
                    this.evidenciasPorMes.push(res[1])

                }
                if (res[0] == 11) {
                    this.mesesEvidencias.push("Noviembre")
                    this.evidenciasPorMes.push(res[1])

                }
                if (res[0] == 12) {
                    this.mesesEvidencias.push("Diciembre")
                    this.evidenciasPorMes.push(res[1])
                }
            });
        })

        this.FormulariosPorUnidadEnRangoDeFecha();
        this.FormulariosPorCriterioEnRangoDeFecha();
        this.FormulariosPorDebilidadEnRangoDeFecha();
        this.FormulariosPorAmbitoAEnRangoDeFecha();
        this.FormulariosPorAmbitoGeoEnRangoDeFecha();
        this.FormulariosPorProcesosEnRangoDeFecha();
        this.FormulariosPorRegistroEnRangoDeFecha();
        this.CantidadDeAsistentePorFormularioEntreFecha();
        this.CantidadDeAsistentePorUnidadEntreFecha();
        this.CantidadDeAsistentePorCriterioEntreFecha();
        this.CantidadDeAsistentePorDebilidadEntreFecha();
        this.CantidadDeAsistentePorAmbitoAcaEntreFecha();
        this.CantidadDeAsistentePorAmbitoGeoEntreFecha();
        this.CantidadDeAsistentePorProcesosEntreFecha();
        this.CantidadDeAsistentePorCriteriosEntreFecha();
    }

    ///////////////////////////////// grafico de pie para buscar por unidad
    unidades: string[] = [];
    cantidadUnidades: number[] = [];


    public pieChartOptions: ChartOptions = {
        responsive: true,
    };
    public pieChartLabels: Label[] = this.unidades;
    public pieChartData: SingleDataSet = this.cantidadUnidades;
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];

    public chartColors: any[] = [
        {
            backgroundColor: ["#D69595", "#3486B8", "#1D6D6C", "#F0B84D", "#A18F24", "#FF3961", "#EDC0CB", "#BABA9E", "#A96674", "#90C8EA", "#C5A4E7"
                , "#4D164D", "#20208B", "#3486B8", "#1D6D6C", "#8BB684", "#486540"]
        }];

    FormulariosPorUnidadEnRangoDeFecha() {
        this.unidades.length = 0;
        this.cantidadUnidades.length = 0;

        this.evidenciaService.FormulariosPorUnidadEnRangoDeFecha(this.fecha1, this.fecha2).subscribe(resp => {
            console.log(resp)
            resp.forEach(res => {
                this.unidades.push(res[0]);
                this.cantidadUnidades.push(res[1]);
            });
        })

    }

    //////////////////////////// grafico de pie para buscar por criterio
    criterios: string[] = []
    cantidadCriterio: number[] = []


    public pieChartLabels2: Label[] = this.criterios;
    public pieChartData2: SingleDataSet = this.cantidadCriterio;

    FormulariosPorCriterioEnRangoDeFecha() {
        this.criterios.length = 0;
        this.cantidadCriterio.length = 0;

        this.evidenciaService.FormulariosPorCriterioEnRangoDeFecha(this.fecha1, this.fecha2).subscribe(resp => {
            console.log(resp)
            resp.forEach(res => {
                this.criterios.push(res[0]);
                this.cantidadCriterio.push(res[1]);
            });
        })

    }

    //////////////////////////// grafico de pie para buscar por Debilidad

    debilidades: string[] = []
    cantidaddebilidad: number[] = []


    public pieChartLabels3: Label[] = this.debilidades;
    public pieChartData3: SingleDataSet = this.cantidaddebilidad;

    FormulariosPorDebilidadEnRangoDeFecha() {
        this.debilidades.length = 0;
        this.cantidaddebilidad.length = 0;

        this.evidenciaService.FormulariosPorDebilidadEnRangoDeFecha(this.fecha1, this.fecha2).subscribe(resp => {
            console.log(resp)
            resp.forEach(res => {
                this.debilidades.push(res[0]);
                this.cantidaddebilidad.push(res[1]);
            });
        })

    }

    //////////////////////////// grafico de pie para buscar por Ambito Academico

    ambitosA: string[] = []
    cantidadambitosA: number[] = []


    public pieChartLabels4: Label[] = this.ambitosA;
    public pieChartData4: SingleDataSet = this.cantidadambitosA;

    FormulariosPorAmbitoAEnRangoDeFecha() {
        this.ambitosA.length = 0;
        this.cantidadambitosA.length = 0;

        this.evidenciaService.FormulariosPorAmbitoAEnRangoDeFecha(this.fecha1, this.fecha2).subscribe(resp => {
            console.log(resp)
            resp.forEach(res => {
                this.ambitosA.push(res[0]);
                this.cantidadambitosA.push(res[1]);
            });
        })

    }

    //////////////////////////// grafico de pie para buscar por Ambito Geografico

    ambitosG: string[] = []
    cantidadambitosG: number[] = []


    public pieChartLabels5: Label[] = this.ambitosG;
    public pieChartData5: SingleDataSet = this.cantidadambitosG;

    FormulariosPorAmbitoGeoEnRangoDeFecha() {
        this.ambitosG.length = 0;
        this.cantidadambitosG.length = 0;

        this.evidenciaService.FormulariosPorAmbitoGeoEnRangoDeFecha(this.fecha1, this.fecha2).subscribe(resp => {
            console.log(resp)
            resp.forEach(res => {
                this.ambitosG.push(res[0]);
                this.cantidadambitosG.push(res[1]);
            });
        })

    }

    //////////////////////////// grafico de pie para buscar por Procesos

    procesos: string[] = []
    cantidadprocesos: number[] = []


    public pieChartLabels6: Label[] = this.procesos;
    public pieChartData6: SingleDataSet = this.cantidadprocesos;

    FormulariosPorProcesosEnRangoDeFecha() {
        this.procesos.length = 0;
        this.cantidadprocesos.length = 0;

        this.evidenciaService.FormulariosPorProcesosEnRangoDeFecha(this.fecha1, this.fecha2).subscribe(resp => {
            console.log(resp)
            resp.forEach(res => {
                this.procesos.push(res[0]);
                this.cantidadprocesos.push(res[1]);
            });
        })

    }

    //////////////////////////// grafico de pie para buscar por Registro

    registros: string[] = []
    cantidadregistros: number[] = []


    public pieChartLabels7: Label[] = this.registros;
    public pieChartData7: SingleDataSet = this.cantidadregistros;

    FormulariosPorRegistroEnRangoDeFecha() {
        this.registros.length = 0;
        this.cantidadregistros.length = 0;

        this.evidenciaService.FormulariosPorRegistroEnRangoDeFecha(this.fecha1, this.fecha2).subscribe(resp => {
            console.log(resp)
            resp.forEach(res => {
                console.log(res)

                this.registros.push(res[0]);
                this.cantidadregistros.push(res[1]);
            });
        })

    }

    ///////////////////////////////////////// grafico de barra para cantidad de asistentes por un rango de fechas
    folio: string[] = []
    cantidadAsistentes: number[] = []

    public barChartLabel2 = this.folio;
    public barChartData2: ChartDataSets[] = [
        { data: this.cantidadAsistentes, label: 'Asistentes' }
    ];

    CantidadDeAsistentePorFormularioEntreFecha() {
        this.folio.length = 0;
        this.cantidadAsistentes.length = 0;
        this.evidenciaService.CantidadDeAsistentePorFormularioEntreFecha(this.fecha1, this.fecha2).subscribe(resp => {
            resp.forEach(res => {
                console.log(res)

                this.folio.push(res[0]);
                this.cantidadAsistentes.push(res[1]);
            });
        })
    }


    //////////////////////////// grafico de pie para cantidad de asistentes de una unidad por un rango de fechas

    AsisUnidad: string[] = []
    cantidadAsisUnidad: number[] = []


    public pieChartLabels8: Label[] = this.AsisUnidad;
    public pieChartData8: SingleDataSet = this.cantidadAsisUnidad;

    CantidadDeAsistentePorUnidadEntreFecha() {
        this.AsisUnidad.length = 0;
        this.cantidadAsisUnidad.length = 0;

        this.evidenciaService.CantidadDeAsistentePorUnidadEntreFecha(this.fecha1, this.fecha2).subscribe(resp => {
            console.log(resp)
            resp.forEach(res => {
                console.log(res)

                this.AsisUnidad.push(res[0]);
                this.cantidadAsisUnidad.push(res[1]);
            });
        })

    }


    //////////////////////////// grafico de pie para cantidad de asistentes de una unidad por un rango de fechas

    AsisCriterio: string[] = []
    cantidadAsisCriterio: number[] = []


    public pieChartLabels9: Label[] = this.AsisCriterio;
    public pieChartData9: SingleDataSet = this.cantidadAsisCriterio;

    CantidadDeAsistentePorCriterioEntreFecha() {
        this.AsisCriterio.length = 0;
        this.cantidadAsisCriterio.length = 0;

        this.evidenciaService.CantidadDeAsistentePorCriterioEntreFecha(this.fecha1, this.fecha2).subscribe(resp => {
            console.log(resp)
            resp.forEach(res => {
                console.log(res)

                this.AsisCriterio.push(res[0]);
                this.cantidadAsisCriterio.push(res[1]);
            });
        })

    }

    //////////////////////////// grafico de pie para cantidad de asistentes de una unidad por un rango de fechas

    AsisDebilidad: string[] = []
    cantidadAsisDebilidad: number[] = []


    public pieChartLabels10: Label[] = this.AsisDebilidad;
    public pieChartData10: SingleDataSet = this.cantidadAsisDebilidad;

    CantidadDeAsistentePorDebilidadEntreFecha() {
        this.AsisDebilidad.length = 0;
        this.cantidadAsisDebilidad.length = 0;

        this.evidenciaService.CantidadDeAsistentePorDebilidadEntreFecha(this.fecha1, this.fecha2).subscribe(resp => {
            console.log(resp)
            resp.forEach(res => {
                console.log(res)

                this.AsisDebilidad.push(res[0]);
                this.cantidadAsisDebilidad.push(res[1]);
            });
        })

    }

    //////////////////////////// grafico de pie para cantidad de asistentes de Ambito academico por un rango de fechas

    AsiAmbitoA: string[] = []
    cantidadAsiAmbitoA: number[] = []


    public pieChartLabels11: Label[] = this.AsiAmbitoA;
    public pieChartData11: SingleDataSet = this.cantidadAsiAmbitoA;

    CantidadDeAsistentePorAmbitoAcaEntreFecha() {
        this.AsiAmbitoA.length = 0;
        this.cantidadAsiAmbitoA.length = 0;

        this.evidenciaService.CantidadDeAsistentePorAmbitoAcaEntreFecha(this.fecha1, this.fecha2).subscribe(resp => {
            console.log(resp)
            resp.forEach(res => {
                console.log(res)

                this.AsiAmbitoA.push(res[0]);
                this.cantidadAsiAmbitoA.push(res[1]);
            });
        })

    }

    //////////////////////////// grafico de pie para cantidad de asistentes de Ambito academico por un rango de fechas

    AsiAmbitoG: string[] = []
    cantidadAsiAmbitoG: number[] = []


    public pieChartLabels12: Label[] = this.AsiAmbitoG;
    public pieChartData12: SingleDataSet = this.cantidadAsiAmbitoG;

    CantidadDeAsistentePorAmbitoGeoEntreFecha() {
        this.AsiAmbitoG.length = 0;
        this.cantidadAsiAmbitoG.length = 0;

        this.evidenciaService.CantidadDeAsistentePorAmbitoGeoEntreFecha(this.fecha1, this.fecha2).subscribe(resp => {
            console.log(resp)
            resp.forEach(res => {
                console.log(res)

                this.AsiAmbitoG.push(res[0]);
                this.cantidadAsiAmbitoG.push(res[1]);
            });
        })

    }

    //////////////////////////// grafico de pie para cantidad de asistentes relacionadas con Procesos por un rango de fechas

    AsiProceso: string[] = []
    cantidadAsiProceso: number[] = []


    public pieChartLabels13: Label[] = this.AsiProceso;
    public pieChartData13: SingleDataSet = this.cantidadAsiProceso;

    CantidadDeAsistentePorProcesosEntreFecha() {
        this.AsiProceso.length = 0;
        this.cantidadAsiProceso.length = 0;

        this.evidenciaService.CantidadDeAsistentePorProcesosEntreFecha(this.fecha1, this.fecha2).subscribe(resp => {
            console.log(resp)
            resp.forEach(res => {
                console.log(res)

                this.AsiProceso.push(res[0]);
                this.cantidadAsiProceso.push(res[1]);
            });
        })

    }

    //////////////////////////// grafico de pie para cantidad de asistentes relacionadas con Criterios por un rango de fechas

    AsiCriterio: string[] = []
    cantidadAsiCriterio: number[] = []


    public pieChartLabels14: Label[] = this.AsiCriterio;
    public pieChartData14: SingleDataSet = this.cantidadAsiCriterio;

    CantidadDeAsistentePorCriteriosEntreFecha() {
        this.AsiCriterio.length = 0;
        this.cantidadAsiCriterio.length = 0;

        this.evidenciaService.CantidadDeAsistentePorCriteriosEntreFecha(this.fecha1, this.fecha2).subscribe(resp => {
            console.log(resp)
            resp.forEach(res => {
                console.log(res)

                this.AsiCriterio.push(res[0]);
                this.cantidadAsiCriterio.push(res[1]);
            });
        })

    }

}




