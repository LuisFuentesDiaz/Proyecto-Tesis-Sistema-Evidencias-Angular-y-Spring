import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Proceso } from 'src/app/clases/proceso';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  private API_SERVER = "http://localhost:9090/proceso";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient) { }


  public  listarprocesos() : Observable<Proceso[]>{
    return this.http.get<Proceso[]>(this.API_SERVER+"/list");
     
   }

   public  listarprocesosPorEsatado(estado:boolean) : Observable<Proceso[]>{
    return this.http.get<Proceso[]>(this.API_SERVER+"/listPorEstado/"+estado);
     
   }


   create(proceso: Proceso) : Observable<Proceso>{
    return this.http.post(this.API_SERVER+"/guardar",proceso,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.proceso as Proceso ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }


  eliminar(id: number) : Observable<any>{
    return this.http.delete(this.API_SERVER+"/delete/"+id).pipe(
      map((response:any) => response.proceso as Proceso ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

  actualizar(proceso: Proceso) : Observable<Proceso>{
    return this.http.put(this.API_SERVER+"/editar",proceso,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.proceso as Proceso ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }


}
