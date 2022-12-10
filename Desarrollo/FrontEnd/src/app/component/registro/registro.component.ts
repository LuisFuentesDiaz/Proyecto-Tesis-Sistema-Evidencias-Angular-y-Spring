import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Registro } from 'src/app/clases/registro';
import { FuncionesService } from 'src/app/servicios/funcionesbasicas/funciones.service';
import { RegistroService } from 'src/app/servicios/registro/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  registro:Registro;
  registros: Registro[];


  id: number;
  nombreRegistro: string;
  estado: boolean = null;
  mostrar_boton: boolean;
  refomat: string;
  filtroUser:string;

  constructor( private registroServicio: RegistroService,) { }
  
  ngOnInit(): void {

    this.listarTodos();



  }








  listarTodos(): void {
    this.registroServicio.listarprocesos().subscribe(resp =>{
      this.registros = resp;
    })

    
  }

  estadoEntrante(estadoentrante: boolean): string {
    if(estadoentrante == true){
      this.refomat = "ACTIVO";
    }else if(estadoentrante == false){
      this.refomat = "INACTIVO";

    }

    return this.refomat;
  }


  create(): void {

    this.registro = new Registro(null,this.nombreRegistro,true);
    this.registroServicio.create(this.registro).subscribe(resp =>{
      this.listarTodos();
      this.reset();
      Swal.fire('Guardado', `El registro ${this.registro.tipo_registro} ha sido creado con exito`, 'success');
      this.closeAddExpenseModal.nativeElement.click();

    })
  }
  reset(): void {
    this.id = null;
    this.nombreRegistro="";
    this.mostrar_boton=false;

  }

  
  actualizar(): void { 

    this.registro = new Registro(this.id,this.nombreRegistro,this.estado);
    this.registroServicio.actualizar(this.registro).subscribe(resp =>{
      this.listarTodos();
      this.reset();
      Swal.fire('Guardado', `El registro ${this.registro.tipo_registro} ha sido creado con exito`, 'success');
      this.closeAddExpenseModal.nativeElement.click();

    })

   }
  eliminar(item: Registro): void {

    Swal.fire({
      title: '¿Seguro que desea eliminar?',
      text: "El registro : " + item.tipo_registro + " sera eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.registroServicio.eliminar(item.id).subscribe(resp => {
          Swal.fire('Eliminado', `El registro: ${item.tipo_registro} ha sido eliminada con exito`, 'success');

          this.listarTodos();

        })
      }
    })

  }
  ver(registro: Registro): void {
    this.id = registro.id;
    this.nombreRegistro = registro.tipo_registro;
    this.estado = registro.estado;
    this.mostrar_boton = true;
  }

  

}
