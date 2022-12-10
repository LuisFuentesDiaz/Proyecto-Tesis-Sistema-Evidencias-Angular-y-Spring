package com.tesis.services;

import java.util.List;

import com.tesis.entidad.Criterio;

public interface CriterioServicio {

	public void GuardarCriterio(Criterio criterio);
	public List<Criterio>ListarCriterios();
	public Criterio ListarCriterioPorId(Long id);
	public void EliminarCriterio(Long id);
	public Criterio buscarCriterioPorCodigo(String criterio);
	public List<Criterio> buscarCriterioPorEstado(Boolean estado);
}
