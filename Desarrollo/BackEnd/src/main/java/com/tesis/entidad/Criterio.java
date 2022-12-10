package com.tesis.entidad;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "criterios")
public class Criterio {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@NotNull
	@Column(unique = true)
	private String codigo;
	@NotNull
	private String nombre;	
	
	private String descripcion;	
	
	private String explicacion;
	
	@NotNull
	private Boolean estado;
	
	public Criterio() {
		
	}
	
	
	

	public Criterio(Long id) {
		this.id = id;
	}




	public Criterio(Long id, @NotNull String codigo, @NotNull String nombre, @NotNull String descripcion,
			@NotNull String explicacion, @NotNull Boolean estado) {
		this.id = id;
		this.codigo = codigo;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.explicacion = explicacion;
		this.estado = estado;
	}



	public String getExplicacion() {
		return explicacion;
	}


 
	
	public Boolean getEstado() {
		return estado;
	}



	public void setEstado(Boolean estado) {
		this.estado = estado;
	}



	public void setExplicacion(String explicacion) {
		this.explicacion = explicacion;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}



	
}
