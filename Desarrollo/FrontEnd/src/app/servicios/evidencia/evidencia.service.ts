import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Label } from 'ng2-charts';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Evidencia } from 'src/app/clases/evidencia';
import { NuevoUsuario } from 'src/app/clases/nuevo-Usuario';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EvidenciaService {

  private API_SERVER = "http://localhost:9090/formulario";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient) { }

  create(evidencia: Evidencia) : Observable<Evidencia>{
    return this.http.post(this.API_SERVER+"/guardar",evidencia,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.evidencia as Evidencia ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

  

  actualizar(evidencia: Evidencia) : Observable<Evidencia>{
    return this.http.put(this.API_SERVER+"/editar/",evidencia,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.evidencia as Evidencia ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

  eliminar(id: number) : Observable<any>{
    return this.http.delete(this.API_SERVER+"/delete/"+id,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.evidencia as Evidencia ),
      catchError(e =>{
        Swal.fire(e.error.mensaje,'','error');
        return throwError(e);
      })
    );
  }

  public  listarTodos() : Observable<Evidencia[]>{
    return this.http.get<Evidencia[]>(this.API_SERVER+"/list");

   }
   public  buscarPorId(id:number) : Observable<Evidencia>{
    return this.http.get<Evidencia>(this.API_SERVER+"/list/"+id);

   }

   public  listarPorUsuarioAndEstadoEnvio(user:number , estado:number) : Observable<Evidencia[]>{
     console.log(user,estado)
    return this.http.get<Evidencia[]>(this.API_SERVER+"/listarPorUsuarioAndEstadoEnvio/"+user+"/"+estado);
    
   }

   //utilizado para trae las evidencias que pertenece a una unidad y en un estado 
   public  listPorUnidadYEstadoResponsable(uni:number,estado:number) : Observable<Evidencia[]>{
    return this.http.get<Evidencia[]>(this.API_SERVER+"/listPorUnidadYEstadoResponsable/"+uni+"/"+estado);
    
   }

   public  buscarPorEstadoDac(estado:number) : Observable<Evidencia[]>{
    return this.http.get<Evidencia[]>(this.API_SERVER+"/listPorEstadoResponsableYDac/"+estado);
    
   }

   public  listPorEstadoDacYUnidad(unidad:number) : Observable<Evidencia[]>{
    return this.http.get<Evidencia[]>(this.API_SERVER+"/listPorEstadoDacYUnidad/"+unidad);    
   }

   public  buscarEvidenciasEntreFechas(fecha1:string , fecha2:string) : Observable<number[]>{
    return this.http.get<number[]>(this.API_SERVER+"/prueba2/"+fecha1+"/"+fecha2);
   }


   public  FormulariosPorUnidadEnRangoDeFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/FormulariosPorUnidadEnRangoDeFecha/"+fecha1+"/"+fecha2);
   }

   public  FormulariosPorCriterioEnRangoDeFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/FormulariosPorCriterioEnRangoDeFecha/"+fecha1+"/"+fecha2);
   }

   public  FormulariosPorDebilidadEnRangoDeFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/FormulariosPorDebilidadEnRangoDeFecha/"+fecha1+"/"+fecha2);
   }

   public  FormulariosPorAmbitoAEnRangoDeFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/FormulariosPorAmbitoAEnRangoDeFecha/"+fecha1+"/"+fecha2);
   }

   public  FormulariosPorAmbitoGeoEnRangoDeFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/FormulariosPorAmbitoGeoEnRangoDeFecha/"+fecha1+"/"+fecha2);
   }

   public  FormulariosPorProcesosEnRangoDeFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/FormulariosPorProcesosEnRangoDeFecha/"+fecha1+"/"+fecha2);
   }

   public  FormulariosPorRegistroEnRangoDeFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/FormulariosPorRegistroEnRangoDeFecha/"+fecha1+"/"+fecha2);
   }

   public  CantidadDeAsistentePorFormularioEntreFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/CantidadDeAsistentePorFormularioEntreFecha/"+fecha1+"/"+fecha2);
   }

   public  CantidadDeAsistentePorUnidadEntreFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/CantidadDeAsistentePorUnidadEntreFecha/"+fecha1+"/"+fecha2);
   }

   public  CantidadDeAsistentePorCriterioEntreFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/CantidadDeAsistentePorCriterioEntreFecha/"+fecha1+"/"+fecha2);
   }

   public  CantidadDeAsistentePorDebilidadEntreFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/CantidadDeAsistentePorDebilidadEntreFecha/"+fecha1+"/"+fecha2);
   }

   public  CantidadDeAsistentePorAmbitoAcaEntreFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/CantidadDeAsistentePorAmbitoAcaEntreFecha/"+fecha1+"/"+fecha2);
   }

   public  CantidadDeAsistentePorAmbitoGeoEntreFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/CantidadDeAsistentePorAmbitoGeoEntreFecha/"+fecha1+"/"+fecha2);
   }

   public  CantidadDeAsistentePorProcesosEntreFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/CantidadDeAsistentePorProcesosEntreFecha/"+fecha1+"/"+fecha2);
   }

   public  CantidadDeAsistentePorCriteriosEntreFecha(fecha1:string , fecha2:string) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/CantidadDeAsistentePorCriteriosEntreFecha/"+fecha1+"/"+fecha2);
   }

   public  cantidadDeEvidenciasPorRolUsuario(id:number) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/cantidadDeEvidenciasPorRolUsuario/"+id);
   }

   public  cantidadDeEvidenciasPorRolResponsable(id:number) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/cantidadDeEvidenciasPorRolResponsable/"+id);
   }

   public  cantidadDeEvidenciasPorRolDca(id:number) : Observable<any[]>{
    return this.http.get<any[]>(this.API_SERVER+"/cantidadDeEvidenciasPorRolDca/"+id);
   }
}

