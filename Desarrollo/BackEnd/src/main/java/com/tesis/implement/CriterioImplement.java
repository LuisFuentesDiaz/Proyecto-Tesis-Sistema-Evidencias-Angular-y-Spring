package com.tesis.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tesis.entidad.Criterio;
import com.tesis.repositorio.CriterioRepositorio;
import com.tesis.services.CriterioServicio;

@Service
public class CriterioImplement implements CriterioServicio {

	@Autowired
	private CriterioRepositorio criteriorepositorio;
	@Override
	public void GuardarCriterio(Criterio criterio) {		
			criteriorepositorio.save(criterio);
	}
	@Override
	public List<Criterio> ListarCriterios() {
		return criteriorepositorio.findAll();
	}
	@Override
	public Criterio ListarCriterioPorId(Long id) {
		return criteriorepositorio.findById(id).orElse(null);
	}
	@Override
	public void EliminarCriterio(Long id) {
		criteriorepositorio.deleteById(id);		
	}
	@Override
	public Criterio buscarCriterioPorCodigo(String codigo) {
		return criteriorepositorio.findByCodigo(codigo);
	}
	@Override
	public List<Criterio> buscarCriterioPorEstado(Boolean estado) {
		return criteriorepositorio.findByEstado(estado);
	}
	
	

}
