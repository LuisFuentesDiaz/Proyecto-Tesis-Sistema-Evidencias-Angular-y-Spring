package com.tesis.entidad;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "procesos")
public class Proceso {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	@NotNull
	@Column(unique = true)
	private String codigo;
	
	@NotNull
	private String nombre_proceso;
	
	@NotNull
	private boolean estado;
	
	public Proceso() {
	}
	
	

	public Proceso(Long id) {
		this.id = id;
	}



	public boolean isEstado() {
		return estado;
	}
	



	public void setEstado(boolean estado) {
		this.estado = estado;
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

	public String getNombre_proceso() {
		return nombre_proceso;
	}

	public void setNombre_proceso(String nombre_proceso) {
		this.nombre_proceso = nombre_proceso;
	}


	
	
}
