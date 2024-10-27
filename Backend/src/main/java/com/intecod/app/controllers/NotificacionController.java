package com.intecod.app.controllers;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.intecod.app.entities.Notificacion;
import com.intecod.app.services.NotificacionService;

import com.intecod.app.entities.User;
import com.intecod.app.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {

    @Autowired
    private NotificacionService service;
    
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Notificacion notificacion, BindingResult result) {

        if (result.hasFieldErrors()) {
            return validation(result);
        }

        Notificacion savedNotificacion = service.save(notificacion);

        User user = userService.findById( notificacion.getUsuarioReceptorId() );

        user.getNotificaciones().add( savedNotificacion.getId() );

        userService.save(user);

        Map<String, Object> response = new HashMap<>();
        
        response.put("valid", true);
        response.put("message", "Notificación creada con éxito");
        response.put("data", savedNotificacion);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        Optional<Notificacion> notificacion = service.findById(id);
        Map<String, Object> response = new HashMap<>();
        if (notificacion.isPresent()) {
            response.put("valid", true);
            response.put("message", "Notificación encontrada");
            response.put("data", notificacion.get());
            return ResponseEntity.ok(response);
        } else {
            response.put("valid", false);
            response.put("message", "Notificación no encontrada");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }


    @GetMapping
    public ResponseEntity<?> getAll() {

        Map<String, Object> response = new HashMap<>();

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String correo = auth.getPrincipal().toString();
        User users = userService.findByCorreo( correo );

        List<Notificacion> notificaciones = service.findByUsuarioReceptorId( users.getId() );

        // Crear una lista para almacenar las notificaciones con el emisor adjunto
        List<Map<String, Object>> notificacionesConEmisor = new ArrayList<>();
        
        // Para cada notificación, busca el usuario emisor y adjúntalo
        for( Notificacion notificacion : notificaciones ){
            
            Map<String, Object> notificacionConEmisor = new HashMap<>();

            // Obtener el usuario emisor usando el usuarioEmisorId
            User emisor = userService.findById( notificacion.getUsuarioEmisorId() );
            
            // Adjuntar la notificación original
            notificacionConEmisor.put("notificacion", notificacion);
            
            // Adjuntar el objeto del usuario emisor
            notificacionConEmisor.put("emisor", emisor);

            // Agregar a la lista
            notificacionesConEmisor.add(notificacionConEmisor);
        }

        response.put("valid", true);
        response.put("message", "Lista de notificaciones");
        response.put("notifcaciones",  notificacionesConEmisor);

        return ResponseEntity.ok(response);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @Valid @RequestBody Notificacion notificacion, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        Optional<Notificacion> existingNotificacion = service.findById(id);
        Map<String, Object> response = new HashMap<>();
        if (existingNotificacion.isPresent()) {
            notificacion.setId(id);
            Notificacion updatedNotificacion = service.save(notificacion);
            response.put("valid", true);
            response.put("message", "Notificación actualizada con éxito");
            response.put("data", updatedNotificacion);
            return ResponseEntity.ok(response);
        } else {
            response.put("valid", false);
            response.put("message", "Notificación no encontrada");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        Optional<Notificacion> notificacion = service.findById(id);
        Map<String, Object> response = new HashMap<>();
        if (notificacion.isPresent()) {
            service.delete(id);
            response.put("valid", true);
            response.put("message", "Notificación eliminada con éxito");
            return ResponseEntity.noContent().build();
        } else {
            response.put("valid", false);
            response.put("message", "Notificación no encontrada");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, Object> errors = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });
        Map<String, Object> response = new HashMap<>();
        response.put("valid", false);
        response.put("message", "Errores de validación");
        response.put("errors", errors);
        return ResponseEntity.badRequest().body(response);
    }


    @PostMapping("/notificaciones_leidas")
    public ResponseEntity<?> marcarComoLeida(@RequestBody Map<String, String> request) {

        String notificacionId = request.get("notificacion_id");

        Map<String, Object> response = new HashMap<>();

        if (notificacionId == null) {
            response.put("valid", false);
            response.put("message", "ID de notificación es requerido");
            return ResponseEntity.badRequest().body(response);
        }

        try {

            Notificacion notificacion = service.marcarComoLeida(notificacionId);

            User user = userService.findById( notificacion.getUsuarioReceptorId()  );
            if( notificacion.getLeido() ){
                user.getNotificaciones().remove( notificacion.getId() );
            }else{
                user.getNotificaciones().add( notificacion.getId() );
            }
            userService.save( user );

            response.put("valid", true);
            response.put("message", "Notificación marcada como leída");
            response.put("data", notificacion);
            return ResponseEntity.ok(response);

        } catch (NoSuchElementException e) {

            response.put("valid", false);
            response.put("message", "Notificación no encontrada");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        
        }

    }

    
    @GetMapping("/usuario/{usuarioReceptorId}")
    public ResponseEntity<?> getByUsuarioReceptorId(@PathVariable String usuarioReceptorId) {
        Map<String, Object> response = new HashMap<>();
        response.put("valid", true);
        response.put("message", "Notificaciones para el usuario receptor");
        response.put("data", service.findByUsuarioReceptorId(usuarioReceptorId));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/crear_mensaje")
    public ResponseEntity<?> crearMensjae(@RequestBody Map<String, String> request) {

        Map<String, Object> response = new HashMap<>();

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String correo = auth.getPrincipal().toString();
        User users = userService.findByCorreo( correo );

        String correoReceptor = request.get("correoReceptor");
        String contenido = request.get("contenido");

        User userReceptor = userService.findByCorreo( correoReceptor );

        if( userReceptor == null ){

            response.put("valid", false);
            response.put("message", "Receptor no encontrado");
            return ResponseEntity.ok(response);

        }
        

        Notificacion notificacion = new Notificacion();
        notificacion.setUsuarioEmisorId( users.getId());
        notificacion.setUsuarioReceptorId( userReceptor.getId() );
        notificacion.setContenido( contenido );
        notificacion.setTipoNotificacion( "Mensaje" );
        notificacion.setFechaEnvio( Date.from( Instant.now()) );
        notificacion.setEvaluacionXEstudianteId( "" );
        notificacion.setLeido( false );

        System.out.println( "-------" );
        System.out.println( notificacion );

        Notificacion savedNotificacion = service.save( notificacion );

        userReceptor.getNotificaciones(  ).add( savedNotificacion.getId() );
        userService.save( userReceptor );
            

        response.put("valid", true);
        response.put("message", "Notificación enviada");
        return ResponseEntity.ok(response);

    }


}
