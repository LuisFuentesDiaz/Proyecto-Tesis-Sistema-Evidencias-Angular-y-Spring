package com.tesis.services;

import java.util.List;

import com.tesis.entidad.Ambito;
import com.tesis.entidad.AmbitoGrafico;

public interface AmbitoServicio {

	public void GuardarAmbito(Ambito criterio);
	public List<Ambito>ListarAmbitos();
	public Ambito ListarAmbitoPorId(Long id);
	public void EliminarAmbito(Long id);
	public Ambito buscarPorNombre(String nombre);
	public List<Ambito> buscarPorEstado(Boolean estado);
}
