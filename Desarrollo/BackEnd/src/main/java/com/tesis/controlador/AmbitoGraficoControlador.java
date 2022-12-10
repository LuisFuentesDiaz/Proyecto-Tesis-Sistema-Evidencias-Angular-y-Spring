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

import com.tesis.entidad.AmbitoGrafico;
import com.tesis.entidad.Formulario;
import com.tesis.entidad.Unidad;
import com.tesis.services.AmbitoGraficoServicio;
import com.tesis.services.FormularioServicio;

@RestController
@RequestMapping("ambitoGeografico")
public class AmbitoGraficoControlador {

	@Autowired
	private AmbitoGraficoServicio ags;
	
	@Autowired
	private FormularioServicio fs;

	@PostMapping("/guardar")
	public ResponseEntity<?> guardarAmbito(@RequestBody AmbitoGrafico grafico) {
		Map<String, Object> response = new HashMap<>();

		try {
				if(ags.buscarPorNombre(grafico.getNombre_ambito()) == null) {
			
						ags.GuardarAmbitoGrafico(grafico);
						return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);

				}else {
					response.put("mensaje", "El ambito ya existe");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
				}
		} catch (Exception e) {
			response.put("mensaje", "Error al ingresar");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);		}
	}

	@GetMapping("/list")
	public ResponseEntity<List> listarGrafico() {
		try {
			return ResponseEntity.ok(ags.ListarAmbitoGraficos());
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/listPorEstado/{estado}")
	public ResponseEntity<List>listarAmbitoPorEstado(@PathVariable Boolean estado){
		try {
			return new ResponseEntity<List>(ags.ListarAmbitoGraficosPorEstado(estado),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/list/{id}")
	public ResponseEntity<AmbitoGrafico> listarGraficoPorId(@PathVariable Long id) {
		try {
			return ResponseEntity.ok(ags.ListarAmbitoGraficoPorId(id));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> eliminarGrafico(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		
		Formulario geografico = fs.verSiExistePorAmbitoGraficoParaEliminarLaAmbitoGrafico(id) ;
		
		
		try {
			if(geografico != null) {
				System.out.println("aqui");

				response.put("mensaje", "Este ambito geografico está asignado a una evidencia");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}

			if (ags.ListarAmbitoGraficoPorId(id) == null) {
				response.put("mensaje", "Error al eliminar");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);		
				} else {
				ags.EliminarAmbitoGrafico(id);
				response.put("mensaje", "Eliminado");
				return new ResponseEntity<Map<String, Object>>(response,HttpStatus.ACCEPTED);	
				}
		} catch (Exception e) {
			response.put("mensaje", "Error al eliminar");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);		}

	}
	
	
	@PutMapping("/editar")
	public ResponseEntity<?> editarAmbitoGrafico(@Valid @RequestBody AmbitoGrafico ambitog,  BindingResult bindingResult ) {
		Map<String, Object> response = new HashMap<>();
		
		
		try {

			if (ags.ListarAmbitoGraficoPorId(ambitog.getId())==null) {
				response.put("mensaje", "El ambito  no existe");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			} else {
				
				ags.GuardarAmbitoGrafico(ambitog);

					response.put("mensaje", "Ambito grafico actualizado Con Exito");
					response.put("rol", ambitog);
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
				
			}
		} catch (Exception e) {
			if(ags.buscarPorNombre(ambitog.getNombre_ambito()) != null && ags.buscarPorNombre(ambitog.getNombre_ambito()).getId() != ambitog.getId()) {
				response.put("mensaje", "El codigo ya esta en uso");
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}else
			response.put("mensaje", "Error al Actualizar");
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
