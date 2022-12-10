package com.tesis.entidad;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "unidades")
public class Unidad {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	
	@Column(nullable = false, unique = true)
	private String codigo;
	
	@NotNull
	private String nombre;
	
	
	@NotNull
	private Boolean estado;
	
	
	public Unidad() {
	}

	public Unidad(Long id) {
		this.id = id;
	}


	public Unidad(Long id, @NotNull String codigo, @NotNull String nombre ,@NotNull Boolean estado) {
		this.id = id;
		this.codigo = codigo;
		this.nombre = nombre;
		this.estado = estado;
	}



	public Boolean getEstado() {
		return estado;
	}



	public void setEstado(Boolean estado) {
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

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	
	
	
	
	
	
}
