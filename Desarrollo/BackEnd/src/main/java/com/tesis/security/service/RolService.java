package com.tesis.security.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tesis.security.entity.Rol;
import com.tesis.security.enums.RolNombre;
import com.tesis.security.repository.RolRepository;

@Service
@Transactional
public class RolService {
	@Autowired
	RolRepository ur;
	
	   public Optional<Rol> getByRolNombre(RolNombre rolNombre){
	        return ur.findByRolNombre(rolNombre);
	    }

	public List<Rol> listar() {
		return ur.findAll();
	}
	   
	   
	public void save(Rol rol) {
		ur.save(rol);
	}

}
