package com.intecod.app.services;

import com.intecod.app.entities.User;

public interface UserService {

    boolean existsByCorreo(String correo);

    User save(User user);

    User findById(String id);
    
    User findByCorreo(String correo);

    Iterable<User> findAll();

    User findByCorreoAndTokenRecuperacion(String correo, String tokenRecuperacion);
    
}
