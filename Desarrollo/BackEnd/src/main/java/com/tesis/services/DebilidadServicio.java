package com.tesis.services;
import java.util.List;

import com.tesis.entidad.Criterio;
import com.tesis.entidad.Debilidad;

public interface DebilidadServicio {

	public Debilidad GuardarDebilidad(Debilidad debilidad);
	public List<Debilidad>ListarDebilidads();
	public Debilidad ListarDebilidadPorId(Long id);
	public void EliminarDebilidad(Long id);
	public Debilidad buscarDebilidadPorCodigo(String codigo);
	public List<Debilidad>ListarDebilidadesPorCriterio(Long id);

}
