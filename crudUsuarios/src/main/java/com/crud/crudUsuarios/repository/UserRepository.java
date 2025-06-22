package com.crud.crudUsuarios.repository;

import com.crud.crudUsuarios.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Usuario,Long> {
}

