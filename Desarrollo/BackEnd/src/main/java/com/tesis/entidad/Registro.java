package com.tesis.entidad;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "registros")
public class Registro {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@NotNull
	@Column(unique = true, name = "tipo_registro")
	private String tipoRegistro;
	
	@NotNull
	private Boolean estado;
	
	public Registro() {
	}
	
	
	
	public Registro(Long id) {
		this.id = id;
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

	public String getTipo_registro() {
		return tipoRegistro;
	}

	public void setTipo_registro(String tipo_registro) {
		this.tipoRegistro = tipo_registro;
	}
	
	
}
