package com.tesis.controlador;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Formatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.Valid;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

import com.tesis.entidad.Formulario;
import com.tesis.entidad.Registro;
import com.tesis.entidad.Unidad;
import com.tesis.repositorio.FormularioRepositorio;
import com.tesis.security.entity.Usuario;
import com.tesis.services.FormularioServicio;

@RestController
@RequestMapping("formulario")
public class FormularioControlador {
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date fecha1;
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date fecha2;
	
	

	@Autowired
	private FormularioServicio fs;
	
	@Autowired
	private FormularioRepositorio fr;
	
	@PostMapping("/guardar")
	public ResponseEntity<?> guardarFormulario( @RequestBody Formulario formulario){		
		Map<String, Object> response = new HashMap<>();
		Date fecha = new Date();
		
		formulario.setFecha(fecha);

		try {
			
			fs.GuardarFormulario(formulario);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
		} catch (Exception e) {
			response.put("mensaje", "Error al guardar");
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);		}	
	}
	
	//en esta lista se consultan todo los formularios	
	@GetMapping("/list")
	public ResponseEntity<List> listarFormulario(){
		
		try {
			return  ResponseEntity.ok(fs.ListarFormularios());
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
	// trae todo los formularios que esten aprobados por el responsable apartte del estado  del dac que se pasa por parametro 
	 //Esta lista pertenece al Dca 
	@GetMapping("/listPorEstadoResponsableYDac/{estado}")
	public ResponseEntity<List> listarFormularioDacEstado(@PathVariable Integer estado){
		String estadoReal = "";
		
		if (estado == 1) {

			estadoReal = "En Espera";
		}else if (estado == 2) {

			estadoReal = "Aprobado";
		}else if (estado == 3) {
			estadoReal = "Rechazado";
		}
		
		
				
		try {
			return  ResponseEntity.ok(fs.listarPorEstadoResponsableyDac("Aprobado",estadoReal));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// trae todo los formularios que esten aprobados por el DCA y qe pertenescan a la unidad
		 //Esta lista pertenece al Director
		@GetMapping("/listPorEstadoDacYUnidad/{unidad}")
		public ResponseEntity<List> listarFormularioDacEstado(@PathVariable Long unidad){
			Unidad uni = new Unidad(unidad);

					
			try {
				return  ResponseEntity.ok(fs.findByEstadoDacAndUnidad("Aprobado",uni));
			} catch (Exception e) {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	
	
	//listar formularios por su id
	@GetMapping("/list/{id}")
	public ResponseEntity<Formulario> buscarFormulario(@PathVariable Long id){
		try {
			return  ResponseEntity.ok(fs.ListarFormularioPorId(id));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	//listatr formularioso por usuario
	//se uttiliza para listar al usuario normal los formularios que el envio y no todos
	@GetMapping("/listarPorUsuarioAndEstadoEnvio/{usu}/{estado}")
	public ResponseEntity<List<Formulario>> buscarFormularioPorUsuario(@PathVariable("usu") Integer usu , @PathVariable("estado") Long estado){
		System.out.println(estado);
		System.out.println(usu);

		Usuario usuario = new Usuario(usu);
		String estadoR = "";
		String estadoD = "";

		
		if (estado == 1) {
			
			return  ResponseEntity.ok(fr.formulariosEnEsperaParaElUsuario(usuario));

		}else if (estado == 2) {
			estadoR = "Aprobado";
			estadoD = "Aprobado";

		}else if (estado == 3) {
			estadoR = "Rechazado";
			estadoD = "Rechazado";
		}
		
		try {
			return  ResponseEntity.ok(fs.listarPorUsuarioAndEstadoEnvio(usuario , estadoR , estadoD));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//lista todo los formularios que pertenezcan a una unidad 
	//usada por el responsable para listar solo los formularios subidos hacia su unidad	
	@GetMapping("/listPorUnidadYEstadoResponsable/{unidad}/{estado}")
	public ResponseEntity<List> listPorUnidadYEstadoResponsable(@PathVariable("unidad") Long unidad , @PathVariable("estado") Long estado){
		Unidad uni = new Unidad(unidad);	
		
		String estadoReal = "";
		
		if (estado == 1) {
			estadoReal = "En Espera";
		}else if (estado == 2) {
			estadoReal = "Aprobado";
		}else if (estado == 3) {
			estadoReal = "Rechazado";
		}
				
		try {
			return  ResponseEntity.ok(fs.listPorUnidadYEstadoResponsable(uni, estadoReal));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
	@GetMapping("/prueba2/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> prueba2(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.prueba(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@GetMapping("/FormulariosPorUnidadEnRangoDeFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> FormulariosPorUnidadEnRangoDeFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.FormulariosPorUnidadEnRangoDeFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@GetMapping("/FormulariosPorCriterioEnRangoDeFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> FormulariosPorCriterioEnRangoDeFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.FormulariosPorCriterioEnRangoDeFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@GetMapping("/FormulariosPorDebilidadEnRangoDeFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> FormulariosPorDebilidadEnRangoDeFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.FormulariosPorDebilidadEnRangoDeFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/FormulariosPorAmbitoAEnRangoDeFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> FormulariosPorAmbitoAEnRangoDeFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.FormulariosPorAmbitoAEnRangoDeFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/FormulariosPorAmbitoGeoEnRangoDeFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> FormulariosPorAmbitoGeoEnRangoDeFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.FormulariosPorAmbitoGeoEnRangoDeFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/FormulariosPorProcesosEnRangoDeFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> FormulariosPorProcesosEnRangoDeFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.FormulariosPorProcesosEnRangoDeFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/FormulariosPorRegistroEnRangoDeFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> FormulariosPorRegistroEnRangoDeFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.FormulariosPorRegistroEnRangoDeFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/CantidadDeAsistentePorFormularioEntreFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> CantidadDeAsistentePorFormularioEntreFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.CantidadDeAsistentePorFormularioEntreFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/CantidadDeAsistentePorUnidadEntreFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> CantidadDeAsistentePorUnidadEntreFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.CantidadDeAsistentePorUnidadEntreFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/CantidadDeAsistentePorCriterioEntreFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> CantidadDeAsistentePorCriterioEntreFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.CantidadDeAsistentePorCriterioEntreFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/CantidadDeAsistentePorDebilidadEntreFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> CantidadDeAsistentePorDebilidadEntreFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.CantidadDeAsistentePorDebilidadEntreFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/CantidadDeAsistentePorAmbitoAcaEntreFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> CantidadDeAsistentePorAmbitoAcaEntreFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.CantidadDeAsistentePorAmbitoAcaEntreFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/CantidadDeAsistentePorAmbitoGeoEntreFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> CantidadDeAsistentePorAmbitoGeoEntreFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.CantidadDeAsistentePorAmbitoGeoEntreFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/CantidadDeAsistentePorProcesosEntreFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> CantidadDeAsistentePorProcesosEntreFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.CantidadDeAsistentePorProcesosEntreFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/CantidadDeAsistentePorCriteriosEntreFecha/{fecha1}/{fecha2}")
	public ResponseEntity<List<?>> CantidadDeAsistentePorCriteriosEntreFecha(@PathVariable("fecha1") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha1,
			@PathVariable("fecha2") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha2 ){

		try {
			return  ResponseEntity.ok(fr.CantidadDeAsistentePorCriteriosEntreFecha(fecha1 , fecha2));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/cantidadDeEvidenciasPorRolUsuario/{id}")
	public ResponseEntity<List<?>> cantidadDeEvidenciasPorRolUsuario(@PathVariable Long id ){
		
		
		try {
			return  ResponseEntity.ok(fr.cantidadDeEvidenciasPorRolUsuario(id));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/cantidadDeEvidenciasPorRolResponsable/{id}")
	public ResponseEntity<List<?>> cantidadDeEvidenciasPorRolResponsable(@PathVariable Long id ){
		
		
		try {
			return  ResponseEntity.ok(fr.cantidadDeEvidenciasPorRolResponsable(id));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/cantidadDeEvidenciasPorRolDca/{id}")
	public ResponseEntity<List<?>> cantidadDeEvidenciasPorRolDca(@PathVariable Long id ){
		
		
		try {
			return  ResponseEntity.ok(fr.cantidadDeEvidenciasPorRolDca(id));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	//eliminar un formulario por id
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> eliminarFormulario(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		String f = "En Espera";
		Formulario form;
		form = fs.ListarFormularioPorId(id);
		try {

			if (fs.ListarFormularioPorId(id) == null) {
				return new ResponseEntity<Boolean>(false, HttpStatus.INTERNAL_SERVER_ERROR);
			} else {

				if (form.getEstado().equals(f)) {

					fs.EliminarFormulario(id);
					return new ResponseEntity<>(true, HttpStatus.OK);

				} else {
					response.put("mensaje", "La evidencia ya esta en revision");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
				}

			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
	
	
	
	
	
	//editar un formulario 
	@PutMapping("/editar")
	public ResponseEntity<?> editarFormulario(@Valid @RequestBody Formulario formulario,  BindingResult bindingResult ) {
		Map<String, Object> response = new HashMap<>();		
		Date fecha = new Date();
		
		formulario.setFecha(fecha);
		
		try {

			if (fs.ListarFormularioPorId(formulario.getId())==null) {
				response.put("mensaje", "El registro  no existe");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			} else {
				
				fs.GuardarFormulario(formulario);

					response.put("mensaje", "Unidad actualizado Con Exito");
					response.put("rol", formulario);
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
				
			}
		} catch (Exception e) {		
			response.put("mensaje", "Error al Actualizar");
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
