package com.tesis.security.controller;

import java.io.Console;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tesis.entidad.Debilidad;
import com.tesis.security.dto.JwtDto;
import com.tesis.security.dto.LoginUsuario;
import com.tesis.security.dto.Mensaje;
import com.tesis.security.dto.NuevoUsuario;
import com.tesis.security.entity.Rol;
import com.tesis.security.entity.Usuario;
import com.tesis.security.enums.RolNombre;
import com.tesis.security.jwt.JwtProvider;
import com.tesis.security.repository.UsuarioRepository;
import com.tesis.security.service.RolService;
import com.tesis.security.service.UsuarioService;
import com.tesis.services.FormularioServicio;

@RestController
@RequestMapping("auth")
@CrossOrigin
public class AuthController {
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	UsuarioRepository ur;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UsuarioService usuarioService;
	
	@Autowired
	RolService rolService;
	
	@Autowired
	JwtProvider jwtProvider;
	
	@Autowired
	FormularioServicio fs;
	
	@PostMapping("/nuevo")
    public ResponseEntity<?> nuevo(@Valid @RequestBody NuevoUsuario nuevoUsuario, BindingResult bindingResult){
		if (usuarioService.validaEmail(nuevoUsuario.getNombreUsuario())) {

		if(bindingResult.hasErrors()) 
            return new ResponseEntity(new Mensaje("campos mal puestos o email inválido"), HttpStatus.BAD_REQUEST);
        if(usuarioService.existsByNombreUsuario(nuevoUsuario.getNombreUsuario())) 
            return new ResponseEntity(new Mensaje("El email ya esta en uso"), HttpStatus.BAD_REQUEST);
        if(ur.existsByRut(nuevoUsuario.getRut())) {
			return new ResponseEntity(new Mensaje("El usuario ya existe"), HttpStatus.BAD_REQUEST);

        }else {
        Usuario usuario =
                new Usuario(null,nuevoUsuario.getRut(),nuevoUsuario.getNombre(),nuevoUsuario.getApellido(), nuevoUsuario.getNombreUsuario(),
                        passwordEncoder.encode(nuevoUsuario.getPassword()),nuevoUsuario.getUnidad(),nuevoUsuario.getEstado());
        
        Set<Rol> roles = new HashSet<>();
        if(nuevoUsuario.getRoles().contains("ROLE_USER")) 
        roles.add(rolService.getByRolNombre(RolNombre.ROLE_USER).get());
        if(nuevoUsuario.getRoles().contains("ROLE_ADMIN")) 
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_ADMIN).get());
	
        if(nuevoUsuario.getRoles().contains("ROLE_DIRECCION_DE_DOCENCIA"))
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_DIRECCION_DE_DOCENCIA).get());
        if(nuevoUsuario.getRoles().contains("ROLE_DCA"))
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_DCA).get());
        if(nuevoUsuario.getRoles().contains("ROLE_RESPONSABLE"))
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_RESPONSABLE).get());
        usuario.setRoles(roles);
        usuarioService.save(usuario);
        return new ResponseEntity(new Mensaje("usuario guardado"), HttpStatus.CREATED);
        }
		}else
			return new ResponseEntity(new Mensaje("Email no valido"), HttpStatus.BAD_REQUEST);
        
		

    }
	
	@PostMapping("/login")
	public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginUsuario loginUsuario, BindingResult bindingResult) {
		
		if (usuarioService.validaEmail(loginUsuario.getNombreUsuario().trim())) {

			if (usuarioService.siExisteUsuarioParaLogin(loginUsuario.getNombreUsuario().trim()) != null) {
				
				if(usuarioService.getByNombreUsuario(loginUsuario.getNombreUsuario().trim()).get().getEstado()) {
					
					if (bindingResult.hasErrors())
						return new ResponseEntity(new Mensaje("campos mal puestos o nombre"), HttpStatus.BAD_REQUEST);

					Authentication authentication = authenticationManager
							.authenticate(new UsernamePasswordAuthenticationToken(loginUsuario.getNombreUsuario().trim(),
									loginUsuario.getPassword().trim()));
					SecurityContextHolder.getContext().setAuthentication(authentication);
					String jwt = jwtProvider.generateToken(authentication);

					UserDetails userDetail = (UserDetails) authentication.getPrincipal();
					System.out.println(userDetail.getAuthorities());
					JwtDto jwtDto = new JwtDto(jwt, userDetail.getUsername(), userDetail.getAuthorities());
					return new ResponseEntity(jwtDto, HttpStatus.OK);				
					
				}else {
					return new ResponseEntity(new Mensaje("Cuenta inactiva"), HttpStatus.BAD_REQUEST);
				}

				

			} else {
				return new ResponseEntity(new Mensaje("Usuario o contraseña invalida"), HttpStatus.BAD_REQUEST);
			}
		} else {
			return new ResponseEntity(new Mensaje("Email no valido"), HttpStatus.BAD_REQUEST);

		}
	}
	
	
	@GetMapping("/list")
	public ResponseEntity<List> listarUsuarios(){
		try {
			return  ResponseEntity.ok(usuarioService.listarUsuarios());
		} catch (Exception e) {
			return new ResponseEntity<List>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@GetMapping("/buscarLogeado/{email}")
	public ResponseEntity<?> buscarLogeado(@PathVariable String email){
		
		try {
			return  ResponseEntity.ok(usuarioService.getByNombreUsuario(email));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/buscarPorRut/{rut}")
	public ResponseEntity<Usuario> buscarPorRut(@PathVariable String rut){
		
		try {
			return  ResponseEntity.ok(usuarioService.ByPorRut(rut));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
	@GetMapping("/listRol")
	public ResponseEntity<List> listarRol(){
		try {
			return  ResponseEntity.ok(rolService.listar());
		} catch (Exception e) {
			return new ResponseEntity<List>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/editar")
	public ResponseEntity<?> editarUsuario(@Valid @RequestBody NuevoUsuario nuevoUsuario ,BindingResult result) {
		Map<String, Object> response = new HashMap<>();

		try {
			if (ur.existsById(nuevoUsuario.getId())) {

				if (usuarioService.validaEmail(nuevoUsuario.getNombreUsuario())) {	
					
					
					Usuario usuario =
			                new Usuario(nuevoUsuario.getId(),nuevoUsuario.getRut(),nuevoUsuario.getNombre(),nuevoUsuario.getApellido(), nuevoUsuario.getNombreUsuario(),
			                        nuevoUsuario.getPassword(),nuevoUsuario.getUnidad(),nuevoUsuario.getEstado());
					
					 Set<Rol> roles = new HashSet<>();
					 if(nuevoUsuario.getRoles().contains("ROLE_USER")) 
					        roles.add(rolService.getByRolNombre(RolNombre.ROLE_USER).get());
				        if(nuevoUsuario.getRoles().contains("ROLE_ADMIN")) 
				            roles.add(rolService.getByRolNombre(RolNombre.ROLE_ADMIN).get());
					
				        if(nuevoUsuario.getRoles().contains("ROLE_DIRECCION_DE_DOCENCIA"))
				            roles.add(rolService.getByRolNombre(RolNombre.ROLE_DIRECCION_DE_DOCENCIA).get());
				        if(nuevoUsuario.getRoles().contains("ROLE_DCA"))
				            roles.add(rolService.getByRolNombre(RolNombre.ROLE_DCA).get());
				        if(nuevoUsuario.getRoles().contains("ROLE_RESPONSABLE"))
				            roles.add(rolService.getByRolNombre(RolNombre.ROLE_RESPONSABLE).get());
				        usuario.setRoles(roles);
					
				        usuarioService.save(usuario);
					response.put("mensaje", "Usuario actualizado");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
				} else
					response.put("mensaje", "Email: "+"'"+nuevoUsuario.getNombreUsuario()+"'"+" no valido");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);

			} else
				response.put("mensaje", "Usuario: "+"'"+nuevoUsuario.getRut()+"'"+" no existe");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);

		} catch (Exception e) {
		
		
			response.put("mensaje", "Error al actualizar");

			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> eliminarUsuario(@PathVariable Integer id) {
		Map<String, Object> response = new HashMap<>();
		Usuario usuario = new Usuario(id);

		try {
			
			if(fs.verSiExistePorUsuarioParaEliminarUsuario(usuario)) {
				response.put("mensaje", "Este usuario está asignado a una evidencia");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			if (ur.existsById(id)){
					ur.deleteById(id);
					response.put("mensaje", "Usuario eliminado correctamente");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
					
					
			} else
				response.put("mensaje", "El usuario no existe");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);

		} catch (Exception e) {

			response.put("mensaje", "Error al eliminar el usuario");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	

}
