package com.tesis.entidad;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "ambitos")
public class Ambito {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@NotNull
	@Column(unique = true)
	private String nombreAmbito;
	
	@NotNull	
	private Boolean estado;
	
	
	public Ambito() {
		
	}
	

	public Ambito(Long id) {
		this.id = id;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getNombreAmbito() {
		return nombreAmbito;
	}

	public void setNombreAmbito(String nombreAmbito) {
		this.nombreAmbito = nombreAmbito;
	}

	public Boolean getEstado() {
		return estado;
	}

	public void setEstado(Boolean estado) {
		this.estado = estado;
	}


	

	
	
}
