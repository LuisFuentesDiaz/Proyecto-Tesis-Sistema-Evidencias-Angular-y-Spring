package com.tesis.security.entity;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.tesis.entidad.Unidad;

public class UsuarioPrincipal implements UserDetails {
	private String rut;
	private String nombre;
	private String apellido;
	private String nombreUsuario;
	private String password;
	private Collection<? extends GrantedAuthority> authorities;
	private Unidad unidad;
	private Boolean estado;

	
	
	
	public UsuarioPrincipal(String rut,String nombre, String apellido, String nombreUsuario, String password,
			Collection<? extends GrantedAuthority> authorities , Unidad unidad,Boolean estado) {
		this.rut = rut;
		this.nombre = nombre;
		this.apellido = apellido;
		this.nombreUsuario = nombreUsuario;
		this.password = password;
		this.authorities = authorities;
		this.unidad = unidad;
		this.estado = estado;
	}

	
	public UsuarioPrincipal(String rut,String nombre, String apellido, String nombreUsuario,Collection<? extends GrantedAuthority> authorities,Unidad unidad,Boolean estado) {
		this.rut = rut;
		this.nombre = nombre;
		this.apellido = apellido;
		this.nombreUsuario = nombreUsuario;
		this.authorities = authorities;
		this.unidad = unidad;
		this.estado = estado;

	}


	public static UsuarioPrincipal build(Usuario usuario) {
		List<GrantedAuthority> authorities = usuario.getRoles().stream().map(rol -> new SimpleGrantedAuthority(rol
				.getRolNombre().name())).collect(Collectors.toList());
		return new UsuarioPrincipal(usuario.getRut(),usuario.getNombre(), usuario.getApellido(), usuario.getNombreUsuario() ,usuario.getPassword(), authorities ,usuario.getUnidad(),usuario.getEstado());
	}
	
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return authorities;
	}
	
	public Unidad getUnidad() {
		return unidad;
	}


	public void setUnidad(Unidad unidad) {
		this.unidad = unidad;
	}


	@Override
	public String getPassword() {
		return password;
	}
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return nombreUsuario;
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	
	
	public Boolean getEstado() {
		return estado;
	}


	public void setEstado(Boolean estado) {
		this.estado = estado;
	}


	public void setPassword(String password) {
		this.password = password;
	}
	 
	

	public String getNombreUsuario() {
		return nombreUsuario;
	}


	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
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


	
	

	
	
}
