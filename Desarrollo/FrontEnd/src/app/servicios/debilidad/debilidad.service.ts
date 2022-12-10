import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Criterio } from 'src/app/clases/criterio';
import { Debilidad } from 'src/app/clases/debilidad';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DebilidadService {

  private API_SERVER = "http://localhost:9090/debilidad";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient) { }

  
  create(ambitoGeografico: Debilidad) : Observable<Debilidad>{
    return this.http.post(this.API_SERVER+"/guardar",ambitoGeografico,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.ambitoGeografico as Debilidad ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

   eliminar(id: number) : Observable<any>{
     return this.http.delete(this.API_SERVER+'/delete/'+id).pipe(
      map((response:any) => response.ambitoGeografico as Debilidad ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

  actualizar(ambitoGeografico: Debilidad) : Observable<Debilidad>{
    return this.http.put(this.API_SERVER+"/editar/",ambitoGeografico,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.ambitoGeografico as Debilidad ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }



  public  listarTodos() : Observable<Debilidad[]>{
    return this.http.get<Debilidad[]>(this.API_SERVER+"/list");
    
     
   }

   public  listarTodosPorCriterio(criterio:number) : Observable<Debilidad[]>{
    return this.http.get<Debilidad[]>(this.API_SERVER+"/listPorCriterio/"+criterio);
    
     
   }

   public  listarPorEstado() : Observable<Debilidad[]>{
    return this.http.get<Debilidad[]>(this.API_SERVER+"/listAmbitoGeograficoEstadoTrue");
     
}
  

}
