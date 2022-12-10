package com.tesis.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.tesis.entidad.Debilidad;
import com.tesis.entidad.Debilidad;
import com.tesis.implement.DebilidadImplement;
import com.tesis.services.DebilidadServicio;
import com.tesis.services.FormularioServicio;

@RestController
@RequestMapping("debilidad")
public class DebilidadControlador {

	@Autowired
	private DebilidadServicio di;
	@Autowired
	private FormularioServicio fs;

	@PostMapping("/guardar")
	public ResponseEntity<?> guardarUser(@RequestBody Debilidad debilidad) {
		Map<String, Object> response = new HashMap<>();

		try {
				if(di.buscarDebilidadPorCodigo(debilidad.getCodigo())== null) {
			
			di.GuardarDebilidad(debilidad);
			response.put("mensaje", "Creado exitosamente" );
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
				}else {
					response.put("mensaje", "Error: El codigo ya esta en uso");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);	
				}
		} catch (Exception e) {

			response.put("mensaje", "Error al ingresar");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);			}

	}

	@GetMapping("/list")
	public ResponseEntity<List> ListarDebilidads() {
		try {
			return ResponseEntity.ok(di.ListarDebilidads());
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/listPorCriterio/{id}")
	public ResponseEntity<List>listarAmbitoPorCriterio(@PathVariable Long id){
		try {
			return new ResponseEntity<List>(di.ListarDebilidadesPorCriterio(id),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/list/{id}")
	public ResponseEntity<Debilidad> DebilidadPorId(@PathVariable Long id) {
		try {
			return ResponseEntity.ok(di.ListarDebilidadPorId(id));
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("delete/{id}")
	private ResponseEntity<?> EliminarDebilidad(@PathVariable("id") Long id) {
		Map<String, Object> response = new HashMap<>();
		Debilidad debilidad = new Debilidad(id);
		
		try {
			if(fs.verSiExistePorDebilidadParaEliminarLaDebilidad(debilidad)) {
				response.put("mensaje", "Esta debilidad está asignada a una evidencia");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			if (di.ListarDebilidadPorId(id) != null) {
				di.EliminarDebilidad(id);
				response.put("mensaje", "Se elimino correctamente");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			} else {
				return ResponseEntity.ok(false);
			}
		} catch (Exception e) {
			response.put("mensaje", "Error al eliminar");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}

	}
	
	
	

	@PutMapping("/editar")
	public ResponseEntity<?> editarDebilidad(@Valid @RequestBody Debilidad debilidad,  BindingResult bindingResult ) {
		Map<String, Object> response = new HashMap<>();
		
		
		try {

			if (di.ListarDebilidadPorId(debilidad.getId()) == null) {
				response.put("mensaje", "La unidad  no existe");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			} else {
				
					di.GuardarDebilidad(debilidad);

					response.put("mensaje", "Actualizado Con Exito");
					response.put("rol", debilidad);
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
				
			}
		} catch (Exception e) {
			response.put("mensaje", "Error al Actualizar");
			return new ResponseEntity<>(response.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
