package com.tesis.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tesis.entidad.Ambito;
import com.tesis.entidad.AmbitoGrafico;
import com.tesis.repositorio.AmbitoRepositorio;
import com.tesis.services.AmbitoServicio;

@Service
public class AmbitoImplement implements AmbitoServicio {

	@Autowired
	private AmbitoRepositorio ambitorepositorio;
	
	@Override
	public void GuardarAmbito(Ambito ambito) {
		ambitorepositorio.save(ambito);
	}

	@Override
	public List<Ambito> ListarAmbitos() {
		return ambitorepositorio.findAll();
	}

	@Override
	public Ambito ListarAmbitoPorId(Long id) {
		return ambitorepositorio.findById(id).orElse(null);
	}

	@Override
	public void EliminarAmbito(Long id) {
		ambitorepositorio.deleteById(id);
	}

	@Override
	public Ambito buscarPorNombre(String nombre) {
		return ambitorepositorio.findByNombreAmbito(nombre);
	}

	@Override
	public List<Ambito> buscarPorEstado(Boolean estado) {
		return ambitorepositorio.findByEstado(estado);
	}

}
