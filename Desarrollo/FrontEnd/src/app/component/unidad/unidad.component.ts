import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { Unidad } from 'src/app/clases/Unidad';
import { TokenService } from 'src/app/servicios/authentication/token.service';
import { UnidadService } from 'src/app/servicios/unidad/unidad.service';
import Swal from 'sweetalert2';
import { ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  unidad:Unidad;
  unidades: Unidad[];

  id:number=null;
  code:string;
  nombre:string;
  estado:boolean;
  refomat:string;
  filtroUser:string;



  estadoSeleccionados:string;

  mostrar_boton:boolean=false;



  constructor(
    private cargaScripts: CargarScriptsService,
    public unidadServicio: UnidadService,
    public fb: FormBuilder,
    public token: TokenService,
  ) {cargaScripts.carga(["unidad/unidad"]);
}

  ngOnInit(): void {
    this.listarUnidades();
  }



  exportAsXLSX(): void{
  }


  reset() {
    this.id = null;
    this.nombre="";
    this.code = "";
    this.mostrar_boton=false;

    
  }

  listarUnidades() {
    this.unidadServicio.listarUnidades().subscribe(res => {
      this.unidades = res;
    })
  }


  create(): void{
    this.id = null;
     this.unidad = new  Unidad(this.id,this.code,this.nombre,true);
    this.unidadServicio.create(this.unidad).subscribe(res => {     
      this.listarUnidades()
      this.reset();
      Swal.fire('Guardado', `La unidad ${this.unidad.nombre} ha sido creado con exito`,'success');
      this.closeAddExpenseModal.nativeElement.click();

    });


  
  }


  actualizar(){
    this.unidad = new  Unidad(this.id,this.code,this.nombre,this.estado);

    this.unidadServicio.actualizar(this.unidad).subscribe(unidad =>{

      this.listarUnidades();
      Swal.fire('Actualizado', `La unidad  ha sido actualizada con exito`,'success');
      this.reset();
      this.closeAddExpenseModal.nativeElement.click();

    })

  }

  estadoEntrante(estado_unidad:boolean):string{
    


    if(estado_unidad == true){
      this.refomat = "ACTIVO";
    }else if(estado_unidad == false){
      this.refomat = "INACTIVO";

    }

    return this.refomat;


  }

  eliminar(item:Unidad):void{

    Swal.fire({
      title: '¿Seguro que desea eliminar?',
      text: "La unidad con el codigo: "+ item.codigo +" sera eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
      
        this.unidadServicio.eliminar(item.id).subscribe(resp =>{
          Swal.fire('Eliminado', `La unidad: ${item.codigo} ha sido eliminada con exito`,'success');

          this.listarUnidades();
          
        })
      }
    })

  }

  

  ver( unidad:Unidad){
    this.id = unidad.id;
    this.code = unidad.codigo
    this.nombre = unidad.nombre;
    this.estado = unidad.estado;
    this.mostrar_boton = true;
  }

  

}
