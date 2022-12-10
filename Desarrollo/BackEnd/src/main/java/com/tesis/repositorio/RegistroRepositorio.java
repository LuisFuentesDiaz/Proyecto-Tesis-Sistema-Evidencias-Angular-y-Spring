package com.tesis.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tesis.entidad.Registro;

public interface RegistroRepositorio extends JpaRepository<Registro, Long> {
	
	public Registro findByTipoRegistro(String tipo_registro);
	public List<Registro> findByEstado(Boolean estado);
	

}
