package com.tesis.services;

import java.util.List;

import com.tesis.entidad.AmbitoGrafico;
import com.tesis.entidad.Criterio;
import com.tesis.entidad.Debilidad;
import com.tesis.entidad.Formulario;
import com.tesis.entidad.Proceso;
import com.tesis.entidad.Registro;
import com.tesis.entidad.Unidad;
import com.tesis.security.entity.Usuario;

public interface FormularioServicio {

	public Formulario GuardarFormulario(Formulario formulario);
	public List<Formulario>ListarFormularios();
	public Formulario ListarFormularioPorId(Long id);
	public void EliminarFormulario(Long id);
	public Formulario buscarPorCodigo(String codigo);
	public List<Formulario> listarPorUsuarioAndEstadoEnvio(Usuario usuario, String estado, String estado2);
	public List<Formulario> listarPorUnidad(Unidad unidad);
	public List<Formulario> listarPorEstadoResponsableyDac(String estadoR, String estadoDac);
	public List<Formulario> findByEstadoDacAndUnidad(String estadoDac, Unidad unidad);
	public List<Formulario> listPorUnidadYEstadoResponsable(Unidad unidad , String estadoR);
	
	public Boolean verSiExistePorDebilidadParaEliminarLaDebilidad (Debilidad debilidad);
	public Boolean verSiExistePorUnidadParaEliminarLaUnidad (Unidad  unidad );
	public Boolean verSiExistePorCriterioParaEliminarLaCriterio(Criterio  criterio );
	public Boolean verSiExistePorProcesoParaEliminarLaProceso(Proceso  proceso );
	public Boolean verSiExistePorRegistroParaEliminarLaRegistro(Registro  registro );
	public Formulario verSiExistePorAmbitoGraficoParaEliminarLaAmbitoGrafico(Long  ambitoG );
	public Formulario verSiExistePorAmbitoAcademicoParaEliminarLaAmbitoAcademico(Long  ambitoA );
	public Boolean verSiExistePorUsuarioParaEliminarUsuario(Usuario  usuario );





	

}
