import { Injectable } from '@angular/core';
import { from, Observable,of,throwError } from 'rxjs';
import {Rol} from '../../clases/Rol';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import swal from'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private API_SERVER = "http://localhost:9090/auth";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  filtroRol='';

  constructor(private http: HttpClient) { 

    

  }
  create(rol: Rol) : Observable<Rol>{
    return this.http.post(this.API_SERVER+"/guardar/",rol,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.rol as Rol ),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

  actualizar(rol: Rol) : Observable<Rol>{
    return this.http.put(this.API_SERVER+"/editar/",rol,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.rol as Rol ),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

  eliminar(id: any) : Observable<any>{
     return this.http.delete(this.API_SERVER+'/delete/'+id).pipe(
      map((response:any) => response.rol as Rol ),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }



  public  listarTodoLosRoles() : Observable<Rol[]>{
    return this.http.get<Rol[]>(this.API_SERVER+"/list");
     
   }

   public  listarRolesPorId(id:number) : Observable<Rol>{
    return this.http.get<Rol>(this.API_SERVER +'/'+id );
     
   }
}
