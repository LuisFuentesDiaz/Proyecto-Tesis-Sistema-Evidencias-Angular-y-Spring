/*
 * package com.tesis.entidad;
 * 
 * import java.util.HashSet; import java.util.Set;
 * 
 * import javax.persistence.CascadeType; import javax.persistence.Column; import
 * javax.persistence.Entity; import javax.persistence.FetchType; import
 * javax.persistence.GeneratedValue; import javax.persistence.GenerationType;
 * import javax.persistence.Id; import javax.persistence.JoinTable; import
 * javax.persistence.JoinColumn; import javax.persistence.ManyToMany; import
 * javax.persistence.Table; import javax.validation.constraints.NotEmpty; import
 * javax.validation.constraints.Size;
 * 
 * import com.tesis.security.entity.Permiso;
 * 
 * 
 * @Entity
 * 
 * @Table(name = "roles") public class Role {
 * 
 * @Id
 * 
 * @GeneratedValue(strategy = GenerationType.AUTO) private Long id;
 * 
 * @NotEmpty
 * 
 * @Column(nullable = false, unique = true)
 * 
 * @Size(min = 2, max = 255) private String nombre;
 * 
 * @Column(nullable = true)
 * 
 * @Size(max = 255) private String descripcion;
 * 
 * @ManyToMany(fetch = FetchType.EAGER)
 * 
 * @JoinTable(name = "rol_permiso", joinColumns = @JoinColumn(name = "rol"),
 * inverseJoinColumns = @JoinColumn(name = "permiso")) private Set<Permiso>
 * permiso = new HashSet<>();
 * 
 * 
 * 
 * public Role() { }
 * 
 * public Long getId() { return id; }
 * 
 * public void setId(Long id) { this.id = id; }
 * 
 * public String getNombre() { return nombre; }
 * 
 * public void setNombre(String nombre) { this.nombre = nombre; }
 * 
 * public String getDescripcion() { return descripcion; }
 * 
 * public void setDescripcion(String descripcion) { this.descripcion =
 * descripcion; }
 * 
 * }
 */