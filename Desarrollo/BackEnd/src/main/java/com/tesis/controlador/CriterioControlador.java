package com.tesis.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tesis.entidad.Criterio;
import com.tesis.entidad.Unidad;
import com.tesis.implement.CriterioImplement;
import com.tesis.services.CriterioServicio;
import com.tesis.services.FormularioServicio;

@RestController
@RequestMapping("criterio")
public class CriterioControlador {

	@Autowired
	private CriterioServicio cs;
	
	@Autowired
	private FormularioServicio fs;

	@PostMapping("/guardar")
	public ResponseEntity<?> guardarUser(@RequestBody Criterio criterio) {
		Map<String, Object> response = new HashMap<>();
		
		
		try {
				
			if(cs.buscarCriterioPorCodigo(criterio.getCodigo())==null) {
				cs.GuardarCriterio(criterio);
			response.put("mensaje", "Criterio creado  exitosamente" );
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
			
			}else {
				response.put("mensaje", "El codigo ya esta en uso" );
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);

			}
		} catch (Exception e) {

			response.put("mensaje", "Error al ingresar" );
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);		}

	}

	@GetMapping("/list")
	public ResponseEntity<List> ListarCriterios() {
		try {
			return ResponseEntity.ok(cs.ListarCriterios());
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/listEstado/{estado}")
	public ResponseEntity<List> ListarCriteriosPorEstado(@PathVariable Boolean estado) {
		try {
			return ResponseEntity.ok(cs.buscarCriterioPorEstado(estado));
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("list/{id}")
	public ResponseEntity<Criterio> CriterioPorId(@PathVariable Long id) {
		try {
			return ResponseEntity.ok(cs.ListarCriterioPorId(id));
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("delete/{id}")
	private ResponseEntity<?> EliminarCriterio(@PathVariable("id") Long id) {
		Map<String, Object> response = new HashMap<>();
		Criterio  criterio = new Criterio (id);
		
		try {
			if(fs.verSiExistePorCriterioParaEliminarLaCriterio(criterio)) {
				response.put("mensaje", "Este criterio está asignado a una evidencia");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			if (cs.ListarCriterioPorId(id) != null) {
				cs.EliminarCriterio(id);
				return ResponseEntity.ok(true);
			} else {
				return ResponseEntity.ok(false);
			}
		} catch (Exception e) {
			response.put("mensaje", "Error al eliminar");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);		}

		// return ResponseEntity.ok(!(ci.ListarCriterioPorId(id)!= null));
	}
	
	
	@PutMapping("/editar")
	public ResponseEntity<?> editarUnidad(@Valid @RequestBody Criterio criterio,  BindingResult bindingResult ) {
		Map<String, Object> response = new HashMap<>();
		
		
		try {

			if (cs.ListarCriterioPorId(criterio.getId())==null) {
				response.put("mensaje", "El criterio  no existe");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			} else {
				
					cs.GuardarCriterio(criterio);

					response.put("mensaje", "Criterio actualizado Con Exito");
					response.put("rol", criterio);
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
				
			}
		} catch (Exception e) {
			if(cs.buscarCriterioPorCodigo(criterio.getCodigo()) != null && cs.buscarCriterioPorCodigo(criterio.getCodigo()).getId() != criterio.getId()) {
				response.put("mensaje", "El codigo ya esta en uso");
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}else
			response.put("mensaje", "Error al Actualizar");
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
