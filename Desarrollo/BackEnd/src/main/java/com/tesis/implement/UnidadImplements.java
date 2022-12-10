package com.tesis.implement;

import java.util.List;

import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tesis.entidad.Unidad;
import com.tesis.repositorio.UnidadRepositorio;
import com.tesis.services.UnidadServicio;

@Service
public class UnidadImplements implements UnidadServicio {
	@Autowired
	private UnidadRepositorio unidadrepositorio;

	@Override
	public Unidad GuardarUnidad(Unidad unidad) {
		return unidadrepositorio.save(unidad);
	}

	@Override
	public List<Unidad> ListarUnidads() {
		return unidadrepositorio.findAll();
	}

	@Override
	public Unidad ListarUnidadPorId(Long id) {
		return unidadrepositorio.findById(id).orElse(null);
	}

	@Override
	public void EliminarUnidad(Long id) {
		unidadrepositorio.deleteById(id);
	}

	@Override
	public List<Unidad> ListarUnidadPorEstado(Boolean estado) {
		return unidadrepositorio.findByEstado(estado);
	}


	

	

}
