import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LoginUsuario } from 'src/app/clases/login-usuario';
import { JwtDto } from 'src/app/clases/jwt-dto';
import { NuevoUsuario } from 'src/app/clases/nuevo-Usuario';
import { map,catchError } from 'rxjs/operators';
import Swal from'sweetalert2';
import { Rol } from 'src/app/clases/Rol';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'http://localhost:9090/auth';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor( private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
    return this.httpClient.post<any>(this.authUrl + "/nuevo/", nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<any>{
    return this.httpClient.post<JwtDto>(this.authUrl + '/login', loginUsuario);

  }

  public  listarTodoLosUser() : Observable<any>{
    return this.httpClient.get<any>(this.authUrl+"/list");
     
   }

   public  buscarPorEmail(email:string) : Observable<NuevoUsuario>{
    return this.httpClient.get<NuevoUsuario>(this.authUrl+"/buscarLogeado/"+email);
     
   }
   public  listarTodoLosRoles() : Observable<Rol[]>{
    return this.httpClient.get<Rol[]>(this.authUrl+"/listRol");
     
   }

   actualizar(usuario: NuevoUsuario) : Observable<NuevoUsuario>{
    return this.httpClient.put(this.authUrl+"/editar/",usuario,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.usuario as NuevoUsuario ),
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }


  eliminar(id: number) : Observable<any>{
    return this.httpClient.delete(this.authUrl+'/delete/'+id).pipe(
     map((response:any) => response.rol as NuevoUsuario ),
     catchError(e =>{
       console.error(e.error.mensaje);
       Swal.fire(e.error.mensaje,'','error');
       return throwError(e);
     })
   );
 }

}
