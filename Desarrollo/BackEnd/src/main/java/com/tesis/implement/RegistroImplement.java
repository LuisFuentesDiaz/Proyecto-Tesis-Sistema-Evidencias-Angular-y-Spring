package com.tesis.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tesis.entidad.Registro;
import com.tesis.repositorio.RegistroRepositorio;
import com.tesis.services.RegistroServicio;

@Service
public class RegistroImplement implements RegistroServicio{

	@Autowired
	private RegistroRepositorio registrorepositorio;
	
	@Override
	public Registro GuardarRegistro(Registro registro) {
		return registrorepositorio.save(registro);
	}

	@Override
	public List<Registro> ListarRegistros() {
		return registrorepositorio.findAll();
	}

	@Override
	public Registro ListarRegistroPorId(Long id) {
		return registrorepositorio.findById(id).orElse(null);
	}

	@Override
	public void EliminarRegistro(Long id) {
		registrorepositorio.deleteById(id);
	}

	@Override
	public Registro buscarRegistroPorNombre(String nombre) {
		return registrorepositorio.findByTipoRegistro(nombre);
	}

	@Override
	public List<Registro> buscarRegistroPorEstado(Boolean estado) {
		return registrorepositorio.findByEstado(estado);
	}

}
