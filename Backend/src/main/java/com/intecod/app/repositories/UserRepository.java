package com.intecod.app.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.intecod.app.entities.User;


public interface UserRepository extends MongoRepository<User, String> {
    
    boolean existsByCorreo(String correo);

    Optional<User> findById(String id);

    Optional<User> findByCorreo(String correo);

    Optional<User> findByCorreoAndTokenRecuperacion(String correo, String token_recuperacion);


}