package com.tesis.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tesis.entidad.Criterio;

public interface CriterioRepositorio extends JpaRepository<Criterio, Long> {
		public Criterio findByCodigo(String codigo);
		public List<Criterio> findByEstado(Boolean estado);
}
