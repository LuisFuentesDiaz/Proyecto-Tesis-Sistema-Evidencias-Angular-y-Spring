package com.tesis.services;

import java.util.List;

import com.tesis.entidad.Unidad;

public interface UnidadServicio {

	public Unidad GuardarUnidad(Unidad unidad);
	public List<Unidad>ListarUnidads();
	public Unidad ListarUnidadPorId(Long id);
	public List<Unidad> ListarUnidadPorEstado(Boolean estado);
	public void EliminarUnidad(Long id);
}
