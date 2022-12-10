import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AmbitoGeografico } from 'src/app/clases/ambito-geografico';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AmbitoGeograficoService {
  private API_SERVER = "http://localhost:9090/ambitoGeografico";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient) { }

  
  create(ambitoGeografico: AmbitoGeografico) : Observable<AmbitoGeografico>{
    return this.http.post(this.API_SERVER+"/guardar",ambitoGeografico,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.ambitoGeografico as AmbitoGeografico ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

   eliminar(id: number) : Observable<any>{
     return this.http.delete(this.API_SERVER+'/delete/'+id).pipe(
      map((response:any) => response.ambitoGeografico as AmbitoGeografico ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

  actualizar(ambitoGeografico: AmbitoGeografico) : Observable<AmbitoGeografico>{
    return this.http.put(this.API_SERVER+"/editar/",ambitoGeografico,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.ambitoGeografico as AmbitoGeografico ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }



  public  listarTodos() : Observable<AmbitoGeografico[]>{
    return this.http.get<AmbitoGeografico[]>(this.API_SERVER+"/list");
    
     
   }

   public  listarPorEstado(estado:boolean) : Observable<AmbitoGeografico[]>{
    return this.http.get<AmbitoGeografico[]>(this.API_SERVER+"/listPorEstado/"+estado);
     
}
  

}
