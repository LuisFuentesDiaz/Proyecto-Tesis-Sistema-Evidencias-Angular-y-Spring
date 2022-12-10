package com.tesis.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tesis.entidad.AmbitoGrafico;
import com.tesis.repositorio.AmbitoGraficoRepositorio;
import com.tesis.services.AmbitoGraficoServicio;

@Service
public class AmbitoGraficoImplement implements AmbitoGraficoServicio {

	@Autowired
	private AmbitoGraficoRepositorio ambitogrficorepositorio;
	
	@Override
	public AmbitoGrafico GuardarAmbitoGrafico(AmbitoGrafico grafico) {
		return ambitogrficorepositorio.save(grafico);
	}

	@Override
	public List<AmbitoGrafico> ListarAmbitoGraficos() {
		return ambitogrficorepositorio.findAll();
	}

	@Override
	public AmbitoGrafico ListarAmbitoGraficoPorId(Long id) {
		return ambitogrficorepositorio.findById(id).orElse(null);
	}

	@Override
	public void EliminarAmbitoGrafico(Long id) {
		ambitogrficorepositorio.deleteById(id);
	}

	@Override
	public AmbitoGrafico buscarPorNombre(String nombre) {
		return ambitogrficorepositorio.findByNombreAmbito(nombre);
	}

	@Override
	public List<AmbitoGrafico> ListarAmbitoGraficosPorEstado(Boolean estado) {
		return ambitogrficorepositorio.findByEstado(estado);
	}

}
