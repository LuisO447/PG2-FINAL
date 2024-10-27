package com.intecod.app.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.intecod.app.entities.Evaluacion;
import com.intecod.app.services.EvaluacionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/evaluaciones")
public class EvaluacionController {

    @Autowired
    private EvaluacionService service;

    @PreAuthorize("hasAuthority('profesor')")
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Evaluacion evaluacion, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }
        Evaluacion savedEvaluacion = service.save(evaluacion);
        Map<String, Object> response = new HashMap<>();
        response.put("valid", true);
        response.put("message", "Evaluación creada con éxito");
        response.put("data", savedEvaluacion);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PreAuthorize("hasAuthority('profesor')")
    @GetMapping("/leccion/{leccionId}")
    public ResponseEntity<?> getByLeccionId(@PathVariable String leccionId) {
        List<Evaluacion> evaluaciones = service.findByLeccionId(leccionId);
        Map<String, Object> response = new HashMap<>();
        response.put("valid", true);
        response.put("message", "Evaluaciones encontradas");
        response.put("data", evaluaciones);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAuthority('profesor')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        Optional<Evaluacion> evaluacion = service.findById(id);
        Map<String, Object> response = new HashMap<>();
        if (evaluacion.isPresent()) {
            response.put("valid", true);
            response.put("message", "Evaluación encontrada");
            response.put("data", evaluacion.get());
            return ResponseEntity.ok(response);
        } else {
            response.put("valid", false);
            response.put("message", "Evaluación no encontrada");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PreAuthorize("hasAuthority('profesor')")
    @GetMapping
    public ResponseEntity<?> getAll() {
        Map<String, Object> response = new HashMap<>();
        response.put("valid", true);
        response.put("message", "Lista de evaluaciones");
        response.put("data", service.findAll());
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAuthority('profesor')")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @Valid @RequestBody Evaluacion evaluacion, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        Optional<Evaluacion> existingEvaluacion = service.findById(id);
        Map<String, Object> response = new HashMap<>();
        if (existingEvaluacion.isPresent()) {
            evaluacion.setId(id);
            Evaluacion updatedEvaluacion = service.save(evaluacion);
            response.put("valid", true);
            response.put("message", "Evaluación actualizada con éxito");
            response.put("data", updatedEvaluacion);
            return ResponseEntity.ok(response);
        } else {
            response.put("valid", false);
            response.put("message", "Evaluación no encontrada");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PreAuthorize("hasAuthority('profesor')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        Optional<Evaluacion> evaluacion = service.findById(id);
        Map<String, Object> response = new HashMap<>();
        if (evaluacion.isPresent()) {
            service.delete(id);
            response.put("valid", true);
            response.put("message", "Evaluación eliminada con éxito");
            return ResponseEntity.noContent().build();
        } else {
            response.put("valid", false);
            response.put("message", "Evaluación no encontrada");
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