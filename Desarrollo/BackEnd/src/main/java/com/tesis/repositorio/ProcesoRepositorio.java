
package com.tesis.repositorio;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tesis.entidad.Proceso;

public interface ProcesoRepositorio extends JpaRepository<Proceso, Long>{

	public Proceso findByCodigo(String codigo);
	public List<Proceso> findByEstado(Boolean estado);
	
}
