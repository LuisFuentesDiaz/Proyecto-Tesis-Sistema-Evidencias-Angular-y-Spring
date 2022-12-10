package com.tesis.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tesis.entidad.Ambito;

public interface AmbitoRepositorio extends JpaRepository<Ambito, Long>{
	public Ambito findByNombreAmbito(String nombre);
	List<Ambito> findByEstado(Boolean estado);
}
