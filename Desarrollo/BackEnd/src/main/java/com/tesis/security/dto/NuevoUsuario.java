package com.tesis.security.dto;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.tesis.entidad.Unidad;



public class NuevoUsuario {
	@NotBlank
	private Integer id;
	@NotBlank
	private String rut;
	@NotBlank
	private String nombre;
	@NotBlank
	private String apellido;
	@Email
	private String nombreUsuario;
	@NotBlank
	private String password;
	
    private Set<String> roles = new HashSet<>();
	
    @NotBlank
	private Unidad unidad;
    @NotBlank
	private Boolean estado;

	
	public NuevoUsuario() {
		
	}
	
	
	
	public Boolean getEstado() {
		return estado;
	}



	public void setEstado(Boolean estado) {
		this.estado = estado;
	}



	public Unidad getUnidad() {
		return unidad;
	}



	public void setUnidad(Unidad unidad) {
		this.unidad = unidad;
	}



	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public String getRut() {
		return rut;
	}
	public void setRut(String rut) {
		this.rut = rut;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellido() {
		return apellido;
	}
	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	public String getNombreUsuario() {
		return nombreUsuario;
	}
	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Set<String> getRoles() {
		return roles;
	}
	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
	
	
	

}
