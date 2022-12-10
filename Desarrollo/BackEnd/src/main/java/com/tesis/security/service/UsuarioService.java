package com.tesis.security.service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tesis.security.entity.Usuario;
import com.tesis.security.repository.UsuarioRepository;

@Service
@Transactional
public class UsuarioService {
	@Autowired
    UsuarioRepository usuarioRepository;
	
	public Optional<Usuario> getByNombreUsuario(String nombreUsuario){
        return usuarioRepository.findByNombreUsuario(nombreUsuario);
    }

	 public boolean existsByNombreUsuario(String nombreUsuario){
	        return usuarioRepository.existsByNombreUsuario(nombreUsuario);
	    }
	 
	 public Usuario siExisteUsuarioParaLogin(String nombreUsuario){
	        return usuarioRepository.siexisteUsuario(nombreUsuario);
	    }
	 
	
	
	   public void save(Usuario usuario){
	        usuarioRepository.save(usuario);
	    }
	
	public List<Usuario> listarUsuarios() {
		return (List<Usuario>) usuarioRepository.findAll();
	}
	
	public boolean ifExistsUsuario(String rut) {
		return usuarioRepository.existsByRut(rut);
	}
	
	public void eliminarUsuario(Integer id) {
		usuarioRepository.deleteById(id);
	}
	
	public String ByNombreUsuario(String nombreUsuario){
		return usuarioRepository.findByNombreUsuario(nombreUsuario).get().getRut();
	}
	
	public Optional<Usuario> ByPorNombreUsuario(String nombreUsuario){
		return usuarioRepository.findByNombreUsuario(nombreUsuario);
	}
	
	public Usuario ByPorRut(String rut){
		return usuarioRepository.findByRut(rut);
	}
	
	public static Boolean validaEmail (String email) {
		Pattern pattern = Pattern.compile("^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$");
		Matcher matcher = pattern.matcher(email);
		return matcher.matches();
	}

}
