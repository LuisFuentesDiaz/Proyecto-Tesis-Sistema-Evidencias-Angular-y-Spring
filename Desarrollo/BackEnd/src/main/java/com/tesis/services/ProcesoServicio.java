package com.tesis.services;

import java.util.List;

import com.tesis.entidad.Proceso;

public interface ProcesoServicio {

	public Proceso GuardarProceso(Proceso proceso);
	public List<Proceso>ListarProcesos();
	public Proceso ListarProcesoPorId(Long id);
	public void EliminarProceso(Long id);
	public Proceso buscarProcesoPoCodigo(String codigo);
	public List<Proceso> buscarProcesoPorEstado(Boolean estado);

}
