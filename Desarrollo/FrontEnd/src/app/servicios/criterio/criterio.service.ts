import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Criterio } from 'src/app/clases/criterio';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CriterioService {
  private API_SERVER = "http://localhost:9090/criterio";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient) { }


  public  listarCriterios() : Observable<Criterio[]>{
    return this.http.get<Criterio[]>(this.API_SERVER+"/list");
     
   }

   public  listarCriteriosEstado(estado:boolean) : Observable<Criterio[]>{
    return this.http.get<Criterio[]>(this.API_SERVER+"/listEstado/"+estado);
     
   }

   create(criterio: Criterio) : Observable<Criterio>{
    return this.http.post(this.API_SERVER+"/guardar",criterio,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.criterio as Criterio ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }


  eliminar(id: number) : Observable<any>{
    return this.http.delete(this.API_SERVER+"/delete/"+id).pipe(
      map((response:any) => response.criterio as Criterio ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

  actualizar(criterio: Criterio) : Observable<Criterio>{
    return this.http.put(this.API_SERVER+"/editar",criterio,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.criterio as Criterio ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }


}
