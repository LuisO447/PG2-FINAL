package com.intecod.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intecod.app.entities.Evaluacion;
import com.intecod.app.repositories.EvaluacionRepository;

@Service
public class EvaluacionService {

    @Autowired
    private EvaluacionRepository repository;

    public Evaluacion save(Evaluacion evaluacion) {
        return repository.save(evaluacion);
    }

    public Optional<Evaluacion> findById(String id) {
        return repository.findById(id);
    }

    public List<Evaluacion> findAll() {
        return repository.findAll();
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    // Métodos personalizados adicionales
    public List<Evaluacion> findByLeccionId(String leccionId) {
        return repository.findByLeccionId(leccionId);
    }
}

