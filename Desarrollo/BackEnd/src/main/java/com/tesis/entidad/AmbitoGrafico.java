package com.tesis.entidad;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name  = "ambitos_geograficos")
public class AmbitoGrafico {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@NotNull
	@Column(unique = true)
	private String nombreAmbito;
	
	@NotNull
	private Boolean estado;
	
	
	public AmbitoGrafico() {
	}
	

	public AmbitoGrafico(Long id) {
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


	public String getNombre_ambito() {
		return nombreAmbito;
	}


	public void setNombre_ambito(String nombre_ambito) {
		this.nombreAmbito = nombre_ambito;
	}

	
	

}
