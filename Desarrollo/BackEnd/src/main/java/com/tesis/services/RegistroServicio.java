package com.tesis.services;

import java.util.List;

import com.tesis.entidad.Registro;

public interface RegistroServicio {

	public Registro GuardarRegistro(Registro registro);
	public List<Registro>ListarRegistros();
	public Registro ListarRegistroPorId(Long id);
	public void EliminarRegistro(Long id);
	public Registro buscarRegistroPorNombre(String nombre);
	public List<Registro> buscarRegistroPorEstado(Boolean estado);

}
