import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Proceso } from 'src/app/clases/proceso';
import { ProcesoService } from 'src/app/servicios/proceso/proceso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.css']
})
export class ProcesoComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;


  procesos: Proceso[];
  mostrar_boton: boolean = false;

  id: number = null;
  codigo: string;
  nombre: string;

  refomat: string;

  proceso: Proceso;
  estado: boolean = null;
  filtroUser:string;


  constructor(private procesoService: ProcesoService) { }

  ngOnInit(): void {

    this.listarProcesos();
  }



  reset() {
    this.id = null;
    this.nombre = "";
    this.codigo = "";
    this.mostrar_boton = false;
  }

  create(): void {

    this.id = null;
    this.proceso = new Proceso(this.id, this.codigo, this.nombre, true);
    this.procesoService.create(this.proceso).subscribe(res => {
      this.listarProcesos()
      this.reset();
      Swal.fire('Guardado', `La proceso ${this.proceso.nombre_proceso} ha sido creado con exito`, 'success');
      this.closeAddExpenseModal.nativeElement.click();

    });


  }

  actualizar() {
    this.proceso = new  Proceso(this.id,this.codigo,this.nombre,this.estado);

    this.procesoService.actualizar(this.proceso).subscribe(proceso =>{
      this.listarProcesos();
      Swal.fire('Actualizado', `El proceso  ha sido actualizada con exito`,'success');
      this.reset();
      this.closeAddExpenseModal.nativeElement.click();

    })
   }

  eliminar(item: Proceso): void {


    Swal.fire({
      title: '¿Seguro que desea eliminar?',
      text: "El proceso con el codigo: " + item.codigo + " sera eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.procesoService.eliminar(item.id).subscribe(resp => {
          Swal.fire('Eliminado', `El proceso: ${item.codigo} ha sido eliminada con exito`, 'success');

          this.listarProcesos();

        })
      }
    })


  }

  ver(proceso: Proceso) {

    this.id = proceso.id;
    this.codigo = proceso.codigo
    this.nombre = proceso.nombre_proceso;
    this.estado = proceso.estado;
    this.mostrar_boton = true;

  }

  estadoEntrante(estado_proceso: boolean): string {
    if (estado_proceso == true) {
      this.refomat = "ACTIVO";
    } else if (estado_proceso == false) {
      this.refomat = "INACTIVO";
    }
    return this.refomat;
  }



  listarProcesos() {
    this.procesoService.listarprocesos().subscribe(resp => {
      this.procesos = resp;
    })

  }
}
