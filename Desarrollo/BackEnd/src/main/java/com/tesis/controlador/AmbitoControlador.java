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

import com.tesis.entidad.Ambito;
import com.tesis.entidad.Formulario;
import com.tesis.entidad.Ambito;
import com.tesis.implement.AmbitoImplement;
import com.tesis.services.FormularioServicio;

@RestController
@RequestMapping("ambito")
public class AmbitoControlador {

	@Autowired
	private AmbitoImplement ai;

	@Autowired
	private FormularioServicio fs;
	
	@PostMapping("/guardar")
	public ResponseEntity<?> guardarAmbito(@RequestBody Ambito ambito) {
		Map<String, Object> response = new HashMap<>();

		try {
				if(ai.buscarPorNombre(ambito.getNombreAmbito()) == null) {
			
						ai.GuardarAmbito(ambito);
						response.put("mensaje", "");

						return new ResponseEntity<Map<String, Object>>( response,HttpStatus.CREATED);

				}else {
					response.put("mensaje", "El ambito ya existe");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
				}
		} catch (Exception e) {
			response.put("mensaje", "Error al ingresar");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);		}
	} 

	@GetMapping("/list")
	public ResponseEntity<List> ListarAmbito() {
		try {
			return ResponseEntity.ok(ai.ListarAmbitos());
			
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/listPorEstado/{estado}")
	public ResponseEntity<List>listarAmbitoPorEstado(@PathVariable Boolean estado){
		try {
			return new ResponseEntity<List>(ai.buscarPorEstado(estado),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

	
	@GetMapping("list/{id}")
	public ResponseEntity<Ambito> AmbitoPorId(@PathVariable Long id) {
		try {
			return ResponseEntity.ok(ai.ListarAmbitoPorId(id));
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("delete/{id}")
	private ResponseEntity<?> EliminarCriterio(@PathVariable("id") Long id) {
		Map<String, Object> response = new HashMap<>();
		
		Formulario academico = fs.verSiExistePorAmbitoAcademicoParaEliminarLaAmbitoAcademico(id) ;
		
		try {
			if(academico != null) {
				System.out.println("aqui");

				response.put("mensaje", "Este ambito geografico está asignado a una evidencia");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			if (ai.ListarAmbitoPorId(id) != null) {
				ai.EliminarAmbito(id);
				response.put("mensaje", "Eliminado");
				return new ResponseEntity<Map<String, Object>>(response,HttpStatus.ACCEPTED);					
			} else {
				response.put("mensaje", "Error al eliminar");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (Exception e) {
			response.put("mensaje", "Error al eliminar");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}

	}
	
	
	@PutMapping("/editar")
	public ResponseEntity<?> editarAmbito(@Valid @RequestBody Ambito ambitoa,  BindingResult bindingResult ) {
		Map<String, Object> response = new HashMap<>();
		
		
		try {

			if (ai.ListarAmbitoPorId(ambitoa.getId())==null) {
				response.put("mensaje", "El ambito  no existe");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			} else {
				
				ai.GuardarAmbito(ambitoa);

					response.put("mensaje", "Ambito grafico actualizado Con Exito");
					response.put("rol", ambitoa);
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
				
			}
		} catch (Exception e) {
			if(ai.buscarPorNombre(ambitoa.getNombreAmbito()) != null && ai.buscarPorNombre(ambitoa.getNombreAmbito()).getId() != ambitoa.getId()) {
				response.put("mensaje", "El codigo ya esta en uso");
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}else
			response.put("mensaje", "Error al Actualizar");
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
