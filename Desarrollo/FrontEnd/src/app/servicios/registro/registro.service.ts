import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Registro } from 'src/app/clases/registro';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RegistroService  {

  
  private API_SERVER = "http://localhost:9090/registro";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }


   listarprocesos() : Observable<Registro[]>{
    return this.http.get<Registro[]>(this.API_SERVER+"/list");
     
   }

   listarprocesosPorEstado(estado:boolean) : Observable<Registro[]>{
    return this.http.get<Registro[]>(this.API_SERVER+"/listPorEstado/"+estado);
     
   }

   create(registro: Registro) : Observable<Registro>{
    return this.http.post(this.API_SERVER+"/guardar",registro,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.registro as Registro ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

  eliminar(id: number) : Observable<any>{
    return this.http.delete(this.API_SERVER+"/delete/"+id).pipe(
      map((response:any) => response.registro as Registro ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }


  actualizar(registro: Registro) : Observable<Registro>{
    console.log(registro);
    return this.http.put(this.API_SERVER+"/editar",registro,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.registro as Registro ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }
}
