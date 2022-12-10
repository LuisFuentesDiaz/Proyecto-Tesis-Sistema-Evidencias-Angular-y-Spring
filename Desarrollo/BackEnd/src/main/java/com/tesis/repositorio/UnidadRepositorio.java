package com.tesis.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tesis.entidad.Unidad;

public interface UnidadRepositorio extends JpaRepository<Unidad, Long>{
	
	public Unidad findByCodigo(String codigo);
	public List<Unidad> findByEstado(Boolean estado);
	


}
