package com.tesis.entidad;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tesis.security.entity.Usuario;

@Entity
@Table(name = "formularios")
public class Formulario {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;

	@NotEmpty
	private String codigo;

	@NotEmpty
	private String nplanmejora;
	
	@NotEmpty
	private String descripcion;
	
	@NotEmpty
	private String resultado;
	
	@NotEmpty
	private String almacenamiento;

	private String personaRelacionada;
	
	@NotEmpty
	private String palabraclave;
	
	@NotEmpty
	private String nombrecorto;
	
	@NotEmpty
	private String estado;
	private String observaciones_r;
	private String observaciones_d;

	@ManyToOne
	@NotNull
	private Usuario usuario;

	@ManyToOne
	private Usuario responsable;

	@ManyToOne
	private Usuario dca;

	@ManyToOne
	@NotNull
	private Debilidad debilidad;

	@ManyToOne
	@NotNull
	private Unidad unidad;

	@ManyToOne
	@NotNull
	private Registro registro;

	@ManyToOne
	@NotNull
	private Ambito ambito_a;

	@ManyToOne
	@NotNull
	private AmbitoGrafico ambito_g;

	@ManyToOne
	@NotNull
	private Proceso proceso;

	@ManyToOne
	@NotNull
	private Criterio criterio;
	
	
	
	private Integer autoridadesI;
	private Integer administrativosI;
	private Integer docentesI;
	private Integer estudiantesI;
	
	private Integer autoridadesE;
	private Integer administrativosE;
	private Integer docentesE;
	private Integer estudiantesE;
	
	
	private String estadoResponsable;
	private String estadoDac;
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date fecha;

	

	public Formulario() {
	}


	public Formulario(Long id, @NotEmpty String codigo, @NotEmpty String nplanmejora, @NotEmpty String descripcion,
			@NotEmpty String resultado, @NotEmpty String almacenamiento, String personaRelacionada,
			@NotEmpty String palabraclave, @NotEmpty String nombrecorto, @NotEmpty String estado,
			String observaciones_r, String observaciones_d, @NotNull Usuario usuario, Usuario responsable, Usuario dca,
			@NotNull Debilidad debilidad, @NotNull Unidad unidad, @NotNull Registro registro, @NotNull Ambito ambito_a,
			@NotNull AmbitoGrafico ambito_g, @NotNull Proceso proceso, @NotNull Criterio criterio, Integer autoridadesI,
			Integer administrativosI, Integer docentesI, Integer estudiantesI, Integer autoridadesE,
			Integer administrativosE, Integer docentesE, Integer estudiantesE, String estadoResponsable,
			String estadoDac,Date fecha) {
		super();
		this.id = id;
		this.codigo = codigo;
		this.nplanmejora = nplanmejora;
		this.descripcion = descripcion;
		this.resultado = resultado;
		this.almacenamiento = almacenamiento;
		this.personaRelacionada = personaRelacionada;
		this.palabraclave = palabraclave;
		this.nombrecorto = nombrecorto;
		this.estado = estado;
		this.observaciones_r = observaciones_r;
		this.observaciones_d = observaciones_d;
		this.usuario = usuario;
		this.responsable = responsable;
		this.dca = dca;
		this.debilidad = debilidad;
		this.unidad = unidad;
		this.registro = registro;
		this.ambito_a = ambito_a;
		this.ambito_g = ambito_g;
		this.proceso = proceso;
		this.criterio = criterio;
		this.autoridadesI = autoridadesI;
		this.administrativosI = administrativosI;
		this.docentesI = docentesI;
		this.estudiantesI = estudiantesI;
		this.autoridadesE = autoridadesE;
		this.administrativosE = administrativosE;
		this.docentesE = docentesE;
		this.estudiantesE = estudiantesE;
		this.estadoResponsable = estadoResponsable;
		this.estadoDac = estadoDac;
		this.fecha = fecha;

	}
	
	

	
	public Formulario(Long id, @NotEmpty String codigo, @NotEmpty String nplanmejora, @NotEmpty String descripcion,
			@NotEmpty String resultado, @NotEmpty String almacenamiento, String personaRelacionada,
			@NotEmpty String palabraclave, @NotEmpty String nombrecorto, @NotEmpty String estado,
			String observaciones_r, String observaciones_d, @NotNull Usuario usuario, Usuario responsable, Usuario dca,
			@NotNull Debilidad debilidad, @NotNull Unidad unidad, @NotNull Registro registro, @NotNull Ambito ambito_a,
			@NotNull AmbitoGrafico ambito_g, @NotNull Proceso proceso, @NotNull Criterio criterio, Integer autoridadesI,
			Integer administrativosI, Integer docentesI, Integer estudiantesI, Integer autoridadesE,
			Integer administrativosE, Integer docentesE, Integer estudiantesE, String estadoResponsable,
			String estadoDac) {
		super();
		this.id = id;
		this.codigo = codigo;
		this.nplanmejora = nplanmejora;
		this.descripcion = descripcion;
		this.resultado = resultado;
		this.almacenamiento = almacenamiento;
		this.personaRelacionada = personaRelacionada;
		this.palabraclave = palabraclave;
		this.nombrecorto = nombrecorto;
		this.estado = estado;
		this.observaciones_r = observaciones_r;
		this.observaciones_d = observaciones_d;
		this.usuario = usuario;
		this.responsable = responsable;
		this.dca = dca;
		this.debilidad = debilidad;
		this.unidad = unidad;
		this.registro = registro;
		this.ambito_a = ambito_a;
		this.ambito_g = ambito_g;
		this.proceso = proceso;
		this.criterio = criterio;
		this.autoridadesI = autoridadesI;
		this.administrativosI = administrativosI;
		this.docentesI = docentesI;
		this.estudiantesI = estudiantesI;
		this.autoridadesE = autoridadesE;
		this.administrativosE = administrativosE;
		this.docentesE = docentesE;
		this.estudiantesE = estudiantesE;
		this.estadoResponsable = estadoResponsable;
		this.estadoDac = estadoDac;
	}


	public Date getFecha() {
		return fecha;
	}


	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Integer getAutoridadesE() {
		return autoridadesE;
	}

	public void setAutoridadesE(Integer autoridadesE) {
		this.autoridadesE = autoridadesE;
	}

	public Integer getAdministrativosE() {
		return administrativosE;
	}


	public void setAdministrativosE(Integer administrativosE) {
		this.administrativosE = administrativosE;
	}

	public Integer getDocentesE() {
		return docentesE;
	}


	public void setDocentesE(Integer docentesE) {
		this.docentesE = docentesE;
	}


	public Integer getEstudiantesE() {
		return estudiantesE;
	}


	public void setEstudiantesE(Integer estudiantesE) {
		this.estudiantesE = estudiantesE;
	}


	public Integer getAutoridadesI() {
		return autoridadesI;
	}

	public void setAutoridadesI(Integer autoridadesI) {
		this.autoridadesI = autoridadesI;
	}


	public Integer getAdministrativosI() {
		return administrativosI;
	}


	public void setAdministrativosI(Integer administrativosI) {
		this.administrativosI = administrativosI;
	}

	public Integer getDocentesI() {
		return docentesI;
	}

	public void setDocentesI(Integer docentesI) {
		this.docentesI = docentesI;
	}

	public Integer getEstudiantesI() {
		return estudiantesI;
	}

	public void setEstudiantesI(Integer estudiantesI) {
		this.estudiantesI = estudiantesI;
	}


	public String getEstadoResponsable() {
		return estadoResponsable;
	}


	public void setEstadoResponsable(String estadoResponsable) {
		this.estadoResponsable = estadoResponsable;
	}

	public String getEstadoDac() {
		return estadoDac;
	}

	public void setEstadoDac(String estadoDac) {
		this.estadoDac = estadoDac;
	}

	public String getPersonaRelacionada() {
		return personaRelacionada;
	}

	public void setPersonaRelacionada(String personaRelacionada) {
		this.personaRelacionada = personaRelacionada;
	}

	public Usuario getDca() {
		return dca;
	}

	public void setDca(Usuario dca) {
		this.dca = dca;
	}

	public Long getId() {
		return id;
	}

	public String getNombrecorto() {
		return nombrecorto;
	}

	public void setNombrecorto(String nombrecorto) {
		this.nombrecorto = nombrecorto;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNplanmejora() {
		return nplanmejora;
	}

	public void setNplanmejora(String nplanmejora) {
		this.nplanmejora = nplanmejora;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getResultado() {
		return resultado;
	}

	public void setResultado(String resultado) {
		this.resultado = resultado;
	}

	public String getAlmacenamiento() {
		return almacenamiento;
	}

	public void setAlmacenamiento(String almacenamiento) {
		this.almacenamiento = almacenamiento;
	}

	public String getPalabraclave() {
		return palabraclave;
	}

	public void setPalabraclave(String palabraclave) {
		this.palabraclave = palabraclave;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getObservaciones_r() {
		return observaciones_r;
	}

	public void setObservaciones_r(String observaciones_r) {
		this.observaciones_r = observaciones_r;
	}

	public String getObservaciones_d() {
		return observaciones_d;
	}

	public void setObservaciones_d(String observaciones_d) {
		this.observaciones_d = observaciones_d;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Usuario getResponsable() {
		return responsable;
	}

	public void setResponsable(Usuario responsable) {
		this.responsable = responsable;
	}

	public Debilidad getDebilidad() {
		return debilidad;
	}

	public void setDebilidad(Debilidad debilidad) {
		this.debilidad = debilidad;
	}

	public Unidad getUnidad() {
		return unidad;
	}

	public void setUnidad(Unidad unidad) {
		this.unidad = unidad;
	}

	public Registro getRegistro() {
		return registro;
	}

	public void setRegistro(Registro registro) {
		this.registro = registro;
	}

	public Ambito getAmbito_a() {
		return ambito_a;
	}

	public void setAmbito_a(Ambito ambito_a) {
		this.ambito_a = ambito_a;
	}

	public AmbitoGrafico getAmbito_g() {
		return ambito_g;
	}

	public void setAmbito_g(AmbitoGrafico ambito_g) {
		this.ambito_g = ambito_g;
	}

	public Proceso getProceso() {
		return proceso;
	}

	public void setProceso(Proceso proceso) {
		this.proceso = proceso;
	}

	public Criterio getCriterio() {
		return criterio;
	}

	public void setCriterio(Criterio criterio) {
		this.criterio = criterio;
	}

}
