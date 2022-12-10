import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { Evidencia } from 'src/app/clases/evidencia';
import { NuevoUsuario } from 'src/app/clases/nuevo-Usuario';
import { AuthService } from 'src/app/servicios/authentication/auth.service';
import { TokenService } from 'src/app/servicios/authentication/token.service';
import { EvidenciaService } from 'src/app/servicios/evidencia/evidencia.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  usuario:NuevoUsuario = null;

  constructor(private tokenService: TokenService,
     private usuarioService:AuthService,
     private evidenciaService:EvidenciaService
    ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {

        this.usuarioService.buscarPorEmail(this.tokenService.getUserName()).subscribe(resp =>{
            this.usuario = resp;
            this.cantidadDeEvidenciasPorRolUsuario(resp.id);
            this.cantidadDeEvidenciasPorRolResponsable(resp.id);
            this.cantidadDeEvidenciasPorRolDca(resp.id);
        })

    }

  }

  evidencias:string[]=[];
  cantidad:number[]=[];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = this.evidencias;
  public pieChartData: SingleDataSet = this.cantidad;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public chartColors: any[] = [
    {
      backgroundColor: ["#D69595", "#3486B8", "#1D6D6C", "#F0B84D", "#A18F24", "#FF3961", "#EDC0CB", "#BABA9E", "#A96674", "#90C8EA", "#C5A4E7"
        , "#4D164D", "#20208B", "#3486B8", "#1D6D6C", "#8BB684", "#486540"]
    }];

    cantidadDeEvidenciasPorRolUsuario(id:number) {
      this.evidencias.length = 0;
      this.cantidad.length = 0;

      this.evidenciaService.cantidadDeEvidenciasPorRolUsuario(id).subscribe(resp => {
        resp.forEach(res => {
          this.evidencias.push(res[0]);
          this.cantidad.push(res[1]);
        });
      })
  
    }

  /////////////// grafico cantidad de evidencias aprobadas y rechazadas por responsable

  evidencias2:string[]=[];
  cantidad2:number[]=[];

  public pieChartLabels2: Label[] = this.evidencias2;
  public pieChartData2: SingleDataSet = this.cantidad2;



  cantidadDeEvidenciasPorRolResponsable(id:number) {
      this.evidencias2.length = 0;
      this.cantidad2.length = 0;

      this.evidenciaService.cantidadDeEvidenciasPorRolResponsable(id).subscribe(resp => {
        resp.forEach(res => {
            this.evidencias2.push(res[0]);
            this.cantidad2.push(res[1]);
          
        });
      })
  
    }

    
  /////////////// grafico cantidad de evidencias aprobadas y rechazadas por dac

  evidencias3:string[]=[];
  cantidad3:number[]=[];

  public pieChartLabels3: Label[] = this.evidencias3;
  public pieChartData3: SingleDataSet = this.cantidad3;



  cantidadDeEvidenciasPorRolDca(id:number) {
      this.evidencias3.length = 0;
      this.cantidad2.length = 0;

      this.evidenciaService.cantidadDeEvidenciasPorRolDca(id).subscribe(resp => {
        resp.forEach(res => {
            this.evidencias3.push(res[0]);
            this.cantidad3.push(res[1]);
        
        });
      })
  
    }

/////////////////////////////////////////grafico solo admin

public barChartOptions: ChartOptions = {
  responsive: true,

};

public barChartLabels = this.evidencias;
public barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [];
public barChartData: ChartDataSets[] = [
  { data: this.cantidad, label: 'Evidencias' }
];



}
