package com.intecod.app.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intecod.app.entities.User;
import com.intecod.app.repositories.UserRepository;
import com.intecod.app.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean existsByCorreo(String correo) {
        return userRepository.existsByCorreo(correo);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findById(String id) {
        Optional<User> userOptional = userRepository.findById( id );
        return userOptional.orElse(null);
    }

    @Override
    public User findByCorreo(String correo) {
        Optional<User> userOptional = userRepository.findByCorreo(correo);
        return userOptional.orElse(null);
    }

    @Override
    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findByCorreoAndTokenRecuperacion( String correo, String tokenRecuperacion){
        return userRepository.findByCorreoAndTokenRecuperacion(correo, tokenRecuperacion)
        .orElse(null); 
    }


}