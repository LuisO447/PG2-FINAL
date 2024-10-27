package com.intecod.app.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.intecod.app.entities.Leccion;
import com.intecod.app.services.LeccionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/lecciones")
public class LeccionController {

    @Autowired
    private LeccionService service;

    @PreAuthorize("hasAuthority('profesor')")
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Leccion leccion, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }
        Leccion savedLeccion = service.save(leccion);
        Map<String, Object> response = new HashMap<>();
        response.put("valid", true);
        response.put("message", "Lección creada con éxito");
        response.put("data", savedLeccion);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PreAuthorize("hasAuthority('profesor')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        Optional<Leccion> leccion = service.findById(id);
        Map<String, Object> response = new HashMap<>();
        if (leccion.isPresent()) {
            response.put("valid", true);
            response.put("message", "Lección encontrada");
            response.put("data", leccion.get());
            return ResponseEntity.ok(response);
        } else {
            response.put("valid", false);
            response.put("message", "Lección no encontrada");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PreAuthorize("hasAuthority('profesor')")
    @GetMapping
    public ResponseEntity<?> getAll() {
        Map<String, Object> response = new HashMap<>();
        response.put("valid", true);
        response.put("message", "Lista de lecciones");
        response.put("data", service.findAll());
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAuthority('profesor')")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @Valid @RequestBody Leccion leccion, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        Optional<Leccion> existingLeccion = service.findById(id);
        Map<String, Object> response = new HashMap<>();
        if (existingLeccion.isPresent()) {
            leccion.setId(id);
            Leccion updatedLeccion = service.save(leccion);
            response.put("valid", true);
            response.put("message", "Lección actualizada con éxito");
            response.put("data", updatedLeccion);
            return ResponseEntity.ok(response);
        } else {
            response.put("valid", false);
            response.put("message", "Lección no encontrada");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PreAuthorize("hasAuthority('profesor')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        Optional<Leccion> leccion = service.findById(id);
        Map<String, Object> response = new HashMap<>();
        if (leccion.isPresent()) {
            service.delete(id);
            response.put("valid", true);
            response.put("message", "Lección eliminada con éxito");
            return ResponseEntity.noContent().build();
        } else {
            response.put("valid", false);
            response.put("message", "Lección no encontrada");
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
}