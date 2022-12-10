import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/authentication/auth.service';
import { TokenService } from 'src/app/servicios/authentication/token.service';
import { NuevoUsuario } from '../../clases/nuevo-Usuario';
import { CargarScriptsService } from "./../../cargar-scripts.service";
import swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RolService } from 'src/app/servicios/Rol/rol.service';
import { Rol } from 'src/app/clases/Rol';
import { Unidad } from 'src/app/clases/Unidad';
import { UnidadService } from 'src/app/servicios/unidad/unidad.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;


  isRegistro = false;
  usuarios: NuevoUsuario[] = [];
  isRegistroFail = false;
  userId : number = null;
  userRut: string;
  nuevoUsuario: NuevoUsuario;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  password: string;
  estado:boolean = true;
  errMsj: string;
  isLogged = false;
  mostrar_boton:boolean = false;
  filtroUser = '';
  roles: Rol[] = [];
  rolesSeleccionados :Rol[];
  rolesSubmit: string[] = [];

  rs:string[] = [];

  unidadSeleccionada: Unidad;
  isRoles = false;
  unidades:Unidad[];

  

  constructor(
    private cargaScripts: CargarScriptsService,
    private tokenService: TokenService,
    private authservice: AuthService,
    private router: Router,
    public fb: FormBuilder,
    public rolService: RolService,
    public unidaService:UnidadService,

  ) {
    cargaScripts.carga(["usuario/usuario"]);
  

  }

  ngOnInit(): void {   

    if (this.tokenService.getToken()) {
      this.listarUsuarios();
      this.listarRoles();
      this.listarUnidadesTrue(true);
    }

  }

 
 

activarRoles(): void{
  if(this.isRoles){
    this.isRoles = false;

  }else
  this.isRoles = true;
}

  onRegistro(): void {
   if(this.rolesSeleccionados == null){

      swal.fire('Complete el formulario', `Seleccione un rol`, 'warning');

   }else if(this.password == ""){
    swal.fire('Complete el formulario', `ingrese una contraseña`, 'warning');

   }else{

    this.rolesSeleccionados.forEach(resp => {
      this.rolesSubmit.push(resp.rolNombre);
    });


    this.nuevoUsuario = new NuevoUsuario(this.userId,this.userRut, this.nombre, this.apellido, this.nombreUsuario, this.password,this.rolesSubmit,this.unidadSeleccionada,true);
    this.authservice.nuevo(this.nuevoUsuario).subscribe(data => {
      this.authservice.listarTodoLosUser().subscribe(resp => {
        this.usuarios = resp;
      }, error => { console.error(error) });
      swal.fire('Guardado', `El usuario ${this.nuevoUsuario.nombre} ha sido creado con exito`, 'success');
      this.closeAddExpenseModal.nativeElement.click();

      this.reset();

    },
      err => {
        this.errMsj = err.error.mensaje;
        swal.fire('Error', ` ${this.errMsj}`, 'warning');
      }

    );
   }
    console.log(this.nuevoUsuario);
  }



  ver(usuario: NuevoUsuario): void {
    this.rolesSubmit = [];
    this.userRut = usuario.rut;
    this.nombre = usuario.nombre;
    this.apellido = usuario.apellido;
    this.password = usuario.password;
    this.userId = usuario.id;
    this.nombreUsuario = usuario.nombreUsuario;
    this.mostrar_boton = true;
    this.unidadSeleccionada = usuario.unidad;
    this.rolesSeleccionados  = usuario.roles;
    this.estado = usuario.estado;

    this.rolesSeleccionados.forEach(resp => {
      this.rolesSubmit.push(resp.rolNombre);
    });
console.log(this.rolesSubmit)
     
  }

 a():void{
  this.rolesSubmit = [];

  this.rolesSeleccionados.forEach(resp => {
    this.rolesSubmit.push(resp.rolNombre);
  });
 }



  listarUsuarios(): void {
    this.authservice.listarTodoLosUser().subscribe(resp => {
      this.usuarios = resp;
    }, error => { console.error(error) });

  }

  listarRoles(): void {
    this.authservice.listarTodoLosRoles().subscribe(resp => {
      resp.forEach(resp => {
        this.roles.push(resp);

      });
    })

  }

  listarUnidadesTrue(estado:boolean): void {
    this.unidaService.listarUnidadesPorEstado(estado).subscribe(resp => {
      this.unidades = resp;
    })

  }

  reset() {
    this.userRut = "";
    this.nombre = "";
    this.apellido = "";
    this.nombreUsuario = "";
    this.password = "";
    this.userId = null;
    this.mostrar_boton = false;
    this.unidadSeleccionada = null;
    this.rolesSeleccionados = null;
    this.rolesSubmit = [];

  }

  editar() {
    this.rolesSubmit = [];
    this.rolesSeleccionados.forEach(resp => {
      this.rolesSubmit.push(resp.rolNombre);
    });
    console.log(this.rolesSubmit);

    this.nuevoUsuario = new NuevoUsuario(this.userId,this.userRut, this.nombre, this.apellido, this.nombreUsuario, this.password,this.rolesSubmit,this.unidadSeleccionada,this.estado);
    this.authservice.actualizar(this.nuevoUsuario).subscribe(usuario => {
      this.authservice.listarTodoLosUser().subscribe(resp => {
        this.usuarios = resp;        
      });

      swal.fire('Actualizado', `El usuario  ha sido actualizado con exito`, 'success');
        this.reset();
        this.mostrar_boton = true;
        this.closeAddExpenseModal.nativeElement.click();

    });
  }


  eliminar( usuario : NuevoUsuario): void{
    swal.fire({
      title: '¿Seguro que desea eliminar?',
      text: "El usuario con el rut: "+usuario.rut+" sera eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authservice.eliminar(usuario.id).subscribe(resp => {
          console.log(resp)
          swal.fire('Eliminado', `El usuario ${usuario.nombre} ha sido eliminado con exito`,'success');
  
          this.authservice.listarTodoLosUser().subscribe(resp => {
            this.usuarios = resp;
          }, error => { console.error(error) });
  
        })
       
      }
    })
  }
  compare(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }


}
