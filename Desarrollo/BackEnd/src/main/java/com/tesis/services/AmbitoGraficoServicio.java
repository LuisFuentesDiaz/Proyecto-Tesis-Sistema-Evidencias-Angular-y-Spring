package com.tesis.services;

import java.util.List;

import com.tesis.entidad.Ambito;
import com.tesis.entidad.AmbitoGrafico;

public interface AmbitoGraficoServicio {

	public AmbitoGrafico GuardarAmbitoGrafico(AmbitoGrafico criterio);
	public List<AmbitoGrafico>ListarAmbitoGraficos();
	public AmbitoGrafico ListarAmbitoGraficoPorId(Long id);
	public void EliminarAmbitoGrafico(Long id);
	public AmbitoGrafico buscarPorNombre(String nombre);
	public List<AmbitoGrafico>ListarAmbitoGraficosPorEstado(Boolean estado);

	
}
