import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Unidad} from '../../clases/Unidad';


@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  private API_SERVER = "http://localhost:9090/unidad";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }



  create(unidad: Unidad) : Observable<Unidad>{
    return this.http.post(this.API_SERVER+"/guardar",unidad,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.unidad as Unidad ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

   eliminar(id: number) : Observable<any>{
     return this.http.delete(this.API_SERVER+'/delete/'+id).pipe(
      map((response:any) => response.unidad as Unidad ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

  actualizar(unidad: Unidad) : Observable<Unidad>{
    return this.http.put(this.API_SERVER+"/editar/",unidad,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.unidad as Unidad ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }



  public  listarUnidades() : Observable<Unidad[]>{
    return this.http.get<Unidad[]>(this.API_SERVER+"/list");
     
   }
   public  listarUnidadesPorId(id:number) : Observable<Unidad>{
    return this.http.get<Unidad>(this.API_SERVER+"/list/"+id);
     
   }

   public  listarUnidadesPorEstado(estado:boolean) : Observable<Unidad[]>{
    return this.http.get<Unidad[]>(this.API_SERVER+"/listUnidadEstado/"+estado);
     
}
}
