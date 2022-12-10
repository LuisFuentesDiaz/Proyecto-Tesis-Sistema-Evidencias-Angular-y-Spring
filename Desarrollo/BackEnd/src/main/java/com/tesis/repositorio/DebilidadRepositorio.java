package com.tesis.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tesis.entidad.Criterio;
import com.tesis.entidad.Debilidad;

public interface DebilidadRepositorio extends JpaRepository<Debilidad, Long> {

	Debilidad findByCodigo(String codigo);
	List<Debilidad> findByCriterio(Criterio criterio);
	
}
