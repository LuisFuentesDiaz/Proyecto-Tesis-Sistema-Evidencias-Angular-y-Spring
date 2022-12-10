package com.tesis.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tesis.entidad.AmbitoGrafico;
import com.tesis.entidad.Criterio;
import com.tesis.entidad.Debilidad;
import com.tesis.entidad.Formulario;
import com.tesis.entidad.Proceso;
import com.tesis.entidad.Registro;
import com.tesis.entidad.Unidad;
import com.tesis.repositorio.FormularioRepositorio;
import com.tesis.security.entity.Usuario;
import com.tesis.services.FormularioServicio;

@Service
public class FormularioImplement implements FormularioServicio {
	
	@Autowired
	private FormularioRepositorio formulariorepositorio;

	@Override
	public Formulario GuardarFormulario(Formulario formulario) {
		return formulariorepositorio.save(formulario);
	}

	@Override
	public List<Formulario> ListarFormularios() {
		return formulariorepositorio.findAll();
	}

	@Override
	public Formulario ListarFormularioPorId(Long id) {
		return formulariorepositorio.findById(id).orElse(null);
	}

	@Override
	public void EliminarFormulario(Long id) {
		formulariorepositorio.deleteById(id);
	}

	@Override
	public Formulario buscarPorCodigo(String codigo) {
		return formulariorepositorio.findByCodigo(codigo);
	}

	@Override
	public List<Formulario> listarPorUsuarioAndEstadoEnvio(Usuario usuario, String estadoR , String estadoD) {
		List<Formulario> form =  formulariorepositorio.findByUsuarioAndEstadoResponsableAndEstadoDac(usuario ,estadoR, estadoD);
		System.out.println(form);
		return form;
	}

	@Override
	public List<Formulario> listarPorUnidad(Unidad unidad) {
		return formulariorepositorio.findByUnidadOrderByEstadoResponsableAsc(unidad);
	}

	@Override
	public List<Formulario> listarPorEstadoResponsableyDac(String estadoR ,String estadoD) {		
		return formulariorepositorio.findByEstadoResponsableAndEstadoDac(estadoR, estadoD);
	}

	
	@Override
	public List<Formulario> findByEstadoDacAndUnidad(String estadoDac, Unidad unidad) {
		return formulariorepositorio.findByEstadoDacAndUnidad(estadoDac, unidad);
	}

	@Override
	public List<Formulario> listPorUnidadYEstadoResponsable(Unidad unidad, String estadoR) {
		return formulariorepositorio.findByUnidadAndEstadoResponsable(unidad, estadoR);
	}

	@Override
	public Boolean verSiExistePorDebilidadParaEliminarLaDebilidad(Debilidad debilidad) {
		return formulariorepositorio.existsByDebilidad(debilidad);
	}

	@Override
	public Boolean verSiExistePorUnidadParaEliminarLaUnidad(Unidad unidad) {
		return formulariorepositorio.existsByUnidad(unidad);
	}

	@Override
	public Boolean verSiExistePorCriterioParaEliminarLaCriterio(Criterio criterio) {
		return formulariorepositorio.existsByCriterio(criterio);
	}

	@Override
	public Boolean verSiExistePorProcesoParaEliminarLaProceso(Proceso proceso) {
		return formulariorepositorio.existsByProceso(proceso);
	}

	@Override
	public Boolean verSiExistePorRegistroParaEliminarLaRegistro(Registro registro) {
		return formulariorepositorio.existsByRegistro(registro);
	}

	@Override
	public Formulario verSiExistePorAmbitoGraficoParaEliminarLaAmbitoGrafico(Long ambitoG) {
		return formulariorepositorio.verSiExisteFormulariosPorAmbitoParaEliminarElAmbito(ambitoG);
	}

	@Override
	public Formulario verSiExistePorAmbitoAcademicoParaEliminarLaAmbitoAcademico(Long ambitoA) {
		return formulariorepositorio.verSiExistePorAmbitoAcademicoParaEliminarLaAmbitoAcademico(ambitoA);
	}

	@Override
	public Boolean verSiExistePorUsuarioParaEliminarUsuario(Usuario usuario) {
		return formulariorepositorio.existsByUsuario(usuario);
	}


}
