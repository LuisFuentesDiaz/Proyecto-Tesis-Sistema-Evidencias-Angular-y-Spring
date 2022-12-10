package com.tesis.implement;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tesis.entidad.Proceso;
import com.tesis.repositorio.ProcesoRepositorio;
import com.tesis.services.ProcesoServicio;

@Service
public  class ProcesoImplement implements ProcesoServicio {

	@Autowired
	private ProcesoRepositorio procesorepositorio;
	
	@Override
	public Proceso GuardarProceso(Proceso proceso) {
		return procesorepositorio.save(proceso);
	}

	@Override
	public List<Proceso> ListarProcesos() {
		return procesorepositorio.findAll();
	}

	@Override
	public Proceso ListarProcesoPorId(Long id) {
		return procesorepositorio.findById(id).orElse(null);
	}

	@Override
	public void EliminarProceso(Long id) {
		procesorepositorio.deleteById(id);
	}

	@Override
	public Proceso buscarProcesoPoCodigo(String codigo) {
		return procesorepositorio.findByCodigo(codigo);
	}

	@Override
	public List<Proceso> buscarProcesoPorEstado(Boolean estado) {
		return procesorepositorio.findByEstado(estado);
	}

}
