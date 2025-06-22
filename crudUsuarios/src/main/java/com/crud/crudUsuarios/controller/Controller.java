package com.crud.crudUsuarios.controller;

import com.crud.crudUsuarios.model.Usuario;
import com.crud.crudUsuarios.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class Controller {

    @Autowired
    private UserRepository userRepository;

    // endpoint para obtener lista de usuarios
    @GetMapping
    public List<Usuario> usuarios(){
        return userRepository.findAll();
    }

    // crear usuario
    @PostMapping
    public Usuario crearUsuario(@Valid @RequestBody Usuario usuario){
        return userRepository.save(usuario);
    }

    // obtener usuario por id
    @GetMapping("/{id}")
    public Usuario getUsuarioById(@PathVariable Long id){
        return userRepository.findById(id).orElse(null);
    }

    // actualizar un usuario
    @PutMapping("/{id}")
    public Usuario actualizarUsuario(@PathVariable Long id,@Valid @RequestBody Usuario usuario){
        // buscamos al usuario
        Usuario existente = userRepository.findById(id).orElse(null);
        if (existente != null){
            existente.setNombre(usuario.getNombre());
            existente.setCorreo(usuario.getCorreo());
            return userRepository.save(existente);
        }
        return null;
    }

    // eliminar un usuario
    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Long id){
        userRepository.deleteById(id);
    }

}
