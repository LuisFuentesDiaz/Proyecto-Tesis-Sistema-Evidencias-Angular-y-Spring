package com.tesis.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tesis.entidad.Criterio;
import com.tesis.entidad.Debilidad;
import com.tesis.repositorio.DebilidadRepositorio;
import com.tesis.services.DebilidadServicio;

@Service
public class DebilidadImplement implements DebilidadServicio {
	
	@Autowired
	private DebilidadRepositorio debilidadrepositorio;

	@Override
	public Debilidad GuardarDebilidad(Debilidad debilidad) {
		return debilidadrepositorio.save(debilidad);
	}

	@Override
	public List<Debilidad> ListarDebilidads() {
		return debilidadrepositorio.findAll();
	}
	
	@Override
	public Debilidad ListarDebilidadPorId(Long id) {
		return debilidadrepositorio.findById(id).orElse(null);
	}

	@Override
	public void EliminarDebilidad(Long id) {
		debilidadrepositorio.deleteById(id);
	}

	@Override
	public Debilidad buscarDebilidadPorCodigo(String codigo) {
		return debilidadrepositorio.findByCodigo(codigo);
	}

	@Override
	public List<Debilidad> ListarDebilidadesPorCriterio(Long id) {
		List<Debilidad> estadoRespuesta = new ArrayList<>();
		List<Debilidad> debilidades = debilidadrepositorio.findAll();
				for(int i=0; i<debilidades.size(); i++){
					if (debilidades.get(i).getCriterio().getId()==id){
						estadoRespuesta.add(debilidades.get(i));
					}
				}
				return estadoRespuesta;
	}

}
