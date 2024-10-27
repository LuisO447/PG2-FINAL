package com.intecod.app.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.intecod.app.entities.User;
import com.intecod.app.services.UserService;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;

import com.intecod.app.services.GenerateJWTService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private GenerateJWTService generateJWTService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(user));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user, BindingResult result) {
        Map<String, Object> response = new HashMap<>();

        // Verificar si el usuario ya existe (ahora por correo)
        if (service.existsByCorreo(user.getCorreo())) {
            response.put("valid", false);
            response.put("message", "El usuario ya existe. Use otro.");
            return ResponseEntity.badRequest().body(response);
        }

        // Verificar si hay errores de validación
        if (result.hasErrors()) {
            return validation(result);
        }
        
        String password_cifrar = CifrarContrasena( user.getContrasena() );
        user.setContrasena( password_cifrar );

        service.save(user);

        List<String> authorities = List.of( user.getTipo_usuario() );
        String token = generateJWTService.generateToken(user.getCorreo(), authorities);

        response.put("valid", true);
        response.put("message", "Usuario creado correctamente");
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, Object> errors = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }

    //// Ping obtiene los datos generales del usuario
        @GetMapping("/ping")
        public ResponseEntity<?> ping(){

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String correo = auth.getPrincipal().toString();

            Map<String, Object> response = new HashMap<>();

            User users = service.findByCorreo( correo );

            response.put("valid", true);
            response.put("message", "Ping users");
            response.put("user", users);

            return ResponseEntity.ok(response);
        }

    //// solicitud para restaurar una cuenta
        @PostMapping("/recovery")
        public ResponseEntity<?> recovery(@Valid @RequestBody User user, BindingResult result) {
        
            Map<String, Object> response = new HashMap<>();

            System.out.println( "-------------------" );
            System.out.println( user );
            // Verificar si el correo existe en la base de datos
            User existingUser = service.findByCorreo( user.getCorreo() );

            if (existingUser == null) {
                response.put("valid", false);
                response.put("message", "El correo no existe.");
                return ResponseEntity.badRequest().body(response);
            }

            // Generar un token de recuperación (hash)
            String recoveryToken = existingUser.generateRecoveryToken(30); // Genera un token de 30 caracteres (puedes ajustar la longitud)
            existingUser.setTokenRecuperacion(recoveryToken); // Suponiendo que tienes un campo 'tokenRestaurar' en tu entidad User

            // Guardar el token en el usuario
            service.save(existingUser);

            // Enviar respuesta
            response.put("valid", true);
            response.put("message", "Se ha enviado un correo con las instrucciones para recuperar la contraseña.");

            return ResponseEntity.ok(response);
        }

     //// solicitud para restaurar una cuenta
        @PostMapping("/restore")
        public ResponseEntity<?> restore(@Valid @RequestBody Map<String, String> request, BindingResult result) {


            Map<String, Object> response = new HashMap<>();

            String tokenRecuperacion = request.get("token");
            String correo = request.get("correo");
            String password = request.get("password");
            String confirmpassword = request.get("confirmpassword");

            // Verificar que las contraseñas coinciden
            if (!password.equals(confirmpassword)) {
                response.put("valid", false);
                response.put("message", "Las contraseñas no coinciden.");
                return ResponseEntity.badRequest().body(response);
            }

            User user = service.findByCorreoAndTokenRecuperacion(correo, tokenRecuperacion);

            String password_cifrar = CifrarContrasena( password );
            // Actualizar la contraseña del usuario
            user.setContrasena( password_cifrar );
            // Limpiar el token de recuperación
            user.setTokenRecuperacion(null);

            // Guardar los cambios en la base de datos
            service.save( user );


            // if( request.password )

            response.put("valid", true);
            response.put("message", "Contraseña actualizado con éxito");

            return ResponseEntity.ok(response);
        }

    //// metodo para actualizar los datos del usuario
        @PutMapping("/update_data")
        public ResponseEntity<?> update_data(@Valid @RequestBody User user, BindingResult result ){

            Map<String, Object> response = new HashMap<>();

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String correo = auth.getPrincipal().toString();
            User users = service.findByCorreo( correo );

            users.setNombre_completo( user.getNombre_completo() );
            users.setEdad( user.getEdad() );

            service.save( users );

            response.put("valid", true);
            response.put("message", "Usuario actualizado con éxito");
            response.put("user", users);

            return ResponseEntity.ok(response);
        }


    //// metodo para actualizar los datos del usuario
        @PutMapping("/update_password")
        public ResponseEntity<?> update_password(@Valid @RequestBody Map<String, String> request, BindingResult result ){

            Map<String, Object> response = new HashMap<>();

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String correo = auth.getPrincipal().toString();
            User users = service.findByCorreo( correo );

            String contrasena = request.get("contrasena");
            String nuevo_contrasena = request.get("nuevo_contrasena");
            String confirmar_contrasena = request.get("confirmar_contrasena");

            System.out.println(nuevo_contrasena);
            System.out.println(confirmar_contrasena);


            // Validar que las nuevas contraseñas coincidan
            if ( !nuevo_contrasena.equals( confirmar_contrasena ) ){
                response.put("valid", false);
                response.put("message", "Las nuevas contraseñas no coinciden");
                return ResponseEntity.badRequest().body(response);
            }

            String password_cifrar = CifrarContrasena( nuevo_contrasena );
            users.setContrasena( password_cifrar );

            service.save( users );

            response.put("valid", true);
            response.put("message", "Usuario actualizado con éxito");
            response.put("user", users);

            return ResponseEntity.ok(response);
        }


        public String CifrarContrasena( String contrasena ){
            return passwordEncoder.encode( contrasena );
        }

}