import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AmbitoAcademico } from 'src/app/clases/ambito-academico';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AmbitoAcademicoService {
  private API_SERVER = "http://localhost:9090/ambito";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient) { }

 
  create(ambitoAcademico: AmbitoAcademico) : Observable<AmbitoAcademico>{
    return this.http.post(this.API_SERVER+"/guardar",ambitoAcademico,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.ambitoAcademico as AmbitoAcademico ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

   eliminar(id: number) : Observable<any>{
     return this.http.delete(this.API_SERVER+'/delete/'+id).pipe(
      map((response:any) => response.ambitoAcademico as AmbitoAcademico ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

  actualizar(ambitoAcademico: AmbitoAcademico) : Observable<AmbitoAcademico>{
    return this.http.put(this.API_SERVER+"/editar/",ambitoAcademico,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.ambitoAcademico as AmbitoAcademico ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }



  public  listarTodos() : Observable<AmbitoAcademico[]>{
    return this.http.get<AmbitoAcademico[]>(this.API_SERVER+"/list");
    
     
   }

   public  listarPorEstado(estado:boolean) : Observable<AmbitoAcademico[]>{
    return this.http.get<AmbitoAcademico[]>(this.API_SERVER+"/listPorEstado/"+estado);
     

}
}