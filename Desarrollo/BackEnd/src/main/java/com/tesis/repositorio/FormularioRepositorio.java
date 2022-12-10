package com.tesis.repositorio;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tesis.entidad.AmbitoGrafico;
import com.tesis.entidad.Criterio;
import com.tesis.entidad.Debilidad;
import com.tesis.entidad.Formulario;
import com.tesis.entidad.Proceso;
import com.tesis.entidad.Registro;
import com.tesis.entidad.Unidad;
import com.tesis.security.entity.Usuario;

public interface FormularioRepositorio extends JpaRepository<Formulario, Long> {
	Formulario findByCodigo(String codigo);
		
	List<Formulario> findByUnidadOrderByEstadoResponsableAsc(Unidad unidad);//Buscar Por unidad (usuario Responsable)
	List<Formulario> findByEstadoResponsableAndEstadoDac(String estadoResponsable,String estadoDac);//buscar por estado responsable y estado del dac(usuario DCA)
	List<Formulario> findByEstadoDacAndUnidad(String estadoDac , Unidad unidad);//buscar por estado dac y unidad (usuario Director)
	List<Formulario> findByUnidadAndEstadoResponsable(Unidad unidad, String estadoR);
	
	

	
	Boolean existsByDebilidad(Debilidad debilidad);
	Boolean existsByUnidad (Unidad  Unidad );
	Boolean existsByCriterio (Criterio  criterio );
	Boolean existsByProceso (Proceso  proceso );
	Boolean existsByRegistro (Registro  registro );
	Boolean existsByUsuario (Usuario  usuario );



	
	@Query(value = "select*from formularios where ambito_g_id = ?1 limit 1", nativeQuery = true)
    public Formulario verSiExisteFormulariosPorAmbitoParaEliminarElAmbito(Long ambitoG);
	
	@Query(value = "select*from formularios where ambito_a_id = ?1 limit 1", nativeQuery = true)
    public Formulario verSiExistePorAmbitoAcademicoParaEliminarLaAmbitoAcademico(Long ambitoA);
	
	@Query(value = "select*from formularios where usuario_id = ?1 and estado_dac = 'En Espera' and estado_responsable = 'En Espera' or usuario_id = ?1 and estado_dac = 'En Espera' and estado_responsable = 'Aprobado'", nativeQuery = true)
    public List<Formulario> formulariosEnEsperaParaElUsuario(Usuario usaurio);
	
	@Query(value = "select*from formularios where usuario_id = ?1 and estado_dac = ?2 and estado_responsable = ?3 or usuario_id = ?1 and estado_dac = 'Rechazado' and estado_responsable = 'Aprobado' or usuario_id = ?1 and estado_dac = 'Rechazado' and estado_responsable = 'Rechazado'", nativeQuery = true)
    public List<Formulario> findByUsuarioAndEstadoResponsableAndEstadoDac(Usuario usaurio , String estado, String estado2);

	@Query(value = "select extract(month from fecha), count(id) from formularios where fecha  between  ?1 and ?2 group by extract(month from fecha) order by extract(month from fecha)", nativeQuery = true)
    public List<?> prueba(Date fecha1 , Date fecha2);
	
	
	@Query(value = "select u.codigo as cod, count(f.id) as ids from formularios f INNER JOIN unidades u on f.unidad_id = u.id where fecha  between ?1 and  ?2 group by  cod ", nativeQuery = true)
    public List<?> FormulariosPorUnidadEnRangoDeFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select cri.codigo as cod, count(f.id) as ids from formularios f INNER JOIN criterios cri on f.criterio_id = cri.id where fecha  between ?1 and  ?2 group by  cod", nativeQuery = true)
    public List<?> FormulariosPorCriterioEnRangoDeFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select deb.codigo as cod, count(f.id) as ids from formularios f INNER JOIN debilidades deb on f.debilidad_id = deb.id where f.fecha  between ?1 and  ?2 group by  cod", nativeQuery = true)
    public List<?> FormulariosPorDebilidadEnRangoDeFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select amb.nombre_ambito as nom, count(f.id) as ids from formularios f INNER JOIN ambitos amb on f.ambito_a_id = amb.id where f.fecha  between ?1 and  ?2 group by  nom", nativeQuery = true)
    public List<?> FormulariosPorAmbitoAEnRangoDeFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select amb.nombre_ambito as nom, count(f.id) as ids from formularios f INNER JOIN ambitos_geograficos amb on f.ambito_g_id = amb.id where f.fecha  between ?1 and ?2  group by  nom", nativeQuery = true)
    public List<?> FormulariosPorAmbitoGeoEnRangoDeFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select pro.codigo as cod, count(f.id) as ids from formularios f INNER JOIN procesos pro on f.proceso_id = pro.id where f.fecha  between ?1 and  ?2 group by  cod", nativeQuery = true)
    public List<?> FormulariosPorProcesosEnRangoDeFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select reg.tipo_registro as nom, count(f.id) as ids from formularios f INNER JOIN registros reg on reg.id = f.registro_id where f.fecha  between ?1 and  ?2 group by  nom", nativeQuery = true)
    public List<?> FormulariosPorRegistroEnRangoDeFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select id, SUM(COALESCE(f.administrativose) + COALESCE(f.administrativosi) + COALESCE(f.autoridadese) + COALESCE(f.autoridadesi) +\r\n"
			+ "		   COALESCE(f.estudiantese) + COALESCE(f.estudiantesi) + COALESCE(f.docentese) + COALESCE(f.docentesi)) as suma from formularios f\r\n"
			+ "		   where f.fecha  between ?1 and  ?2 group by id order by suma desc", nativeQuery = true)
    public List<?> CantidadDeAsistentePorFormularioEntreFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select uni.codigo cod ,SUM(COALESCE(f.administrativose) + COALESCE(f.administrativosi) + COALESCE(f.autoridadese) + COALESCE(f.autoridadesi) +COALESCE(f.estudiantese) + COALESCE(f.estudiantesi) + COALESCE(f.docentese) + COALESCE(f.docentesi)) as suma\r\n"
			+ "		   from formularios f inner join unidades uni ON uni.id = f.unidad_id where f.fecha  between ?1 and  ?2 group by cod order by suma\r\n"
			+ "", nativeQuery = true)
    public List<?> CantidadDeAsistentePorUnidadEntreFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select cri.codigo cod ,SUM(COALESCE(f.administrativose) + COALESCE(f.administrativosi) + COALESCE(f.autoridadese) + COALESCE(f.autoridadesi) +COALESCE(f.estudiantese) + COALESCE(f.estudiantesi) + COALESCE(f.docentese) + COALESCE(f.docentesi)) as suma\r\n"
			+ "		   from formularios f inner join criterios cri ON cri.id = f.criterio_id where f.fecha  between ?1 and  ?2 group by cod order by suma desc", nativeQuery = true)
    public List<?> CantidadDeAsistentePorCriterioEntreFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select deb.codigo cod ,SUM(COALESCE(f.administrativose) + COALESCE(f.administrativosi) + COALESCE(f.autoridadese) + COALESCE(f.autoridadesi) +COALESCE(f.estudiantese) + COALESCE(f.estudiantesi) + COALESCE(f.docentese) + COALESCE(f.docentesi)) as suma\r\n"
			+ "		   from formularios f inner join debilidades deb ON deb.id = f.debilidad_id where f.fecha  between ?1 and  ?2 group by cod order by suma desc", nativeQuery = true)
    public List<?> CantidadDeAsistentePorDebilidadEntreFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select ambA.nombre_ambito nom ,SUM(COALESCE(f.administrativose) + COALESCE(f.administrativosi) + COALESCE(f.autoridadese) + COALESCE(f.autoridadesi) +COALESCE(f.estudiantese) + COALESCE(f.estudiantesi) + COALESCE(f.docentese) + COALESCE(f.docentesi)) as suma\r\n"
			+ "		   from formularios f inner join ambitos ambA ON ambA.id = f.ambito_a_id where f.fecha  between ?1 and  ?2 group by nom order by suma desc", nativeQuery = true)
    public List<?> CantidadDeAsistentePorAmbitoAcaEntreFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select ambG.nombre_ambito nom ,SUM(COALESCE(f.administrativose) + COALESCE(f.administrativosi) + COALESCE(f.autoridadese) + COALESCE(f.autoridadesi) +COALESCE(f.estudiantese) + COALESCE(f.estudiantesi) + COALESCE(f.docentese) + COALESCE(f.docentesi)) as suma\r\n"
			+ "		   from formularios f inner join ambitos_geograficos ambG ON ambG.id = f.ambito_g_id where f.fecha  between ?1 and  ?2 group by nom order by suma desc", nativeQuery = true)
    public List<?> CantidadDeAsistentePorAmbitoGeoEntreFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select pro.codigo cod ,SUM(COALESCE(f.administrativose) + COALESCE(f.administrativosi) + COALESCE(f.autoridadese) + COALESCE(f.autoridadesi) +COALESCE(f.estudiantese) + COALESCE(f.estudiantesi) + COALESCE(f.docentese) + COALESCE(f.docentesi)) as suma\r\n"
			+ "		   from formularios f inner join procesos pro ON pro.id = f.proceso_id where f.fecha  between ?1 and  ?2 group by cod order by suma desc", nativeQuery = true)
    public List<?> CantidadDeAsistentePorProcesosEntreFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select cri.codigo cod ,SUM(COALESCE(f.administrativose) + COALESCE(f.administrativosi) + COALESCE(f.autoridadese) + COALESCE(f.autoridadesi) +COALESCE(f.estudiantese) + COALESCE(f.estudiantesi) + COALESCE(f.docentese) + COALESCE(f.docentesi)) as suma\r\n"
			+ "		   from formularios f inner join criterios cri ON cri.id = f.criterio_id where f.fecha  between ?1 and  ?2 group by cod order by suma desc", nativeQuery = true)
    public List<?> CantidadDeAsistentePorCriteriosEntreFecha(Date fecha1 , Date fecha2);
	
	@Query(value = "select uni.nombre as nom, count(f.id) as ids from formularios f INNER JOIN unidades uni on uni.id = f.unidad_id  where f.usuario_id = ?1 group by nom", nativeQuery = true)
    public List<?> cantidadDeEvidenciasPorRolUsuario(Long user);
	
	@Query(value = "select f.estado_responsable es , count(f.estado_responsable) from formularios f where f.responsable_id = ?1 and (f.estado_responsable = 'Aprobado'  or f.estado_responsable = 'Rechazado') group by es", nativeQuery = true)
    public List<?> cantidadDeEvidenciasPorRolResponsable(Long user);
	
	@Query(value = "select f.estado_dac es , count(f.estado_dac) from formularios f where f.dca_id = ?1 and (f.estado_dac = 'Aprobado'  or f.estado_dac = 'Rechazado') group by es", nativeQuery = true)
    public List<?> cantidadDeEvidenciasPorRolDca(Long user);
}

