package com.intecod.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intecod.app.entities.Leccion;
import com.intecod.app.repositories.LeccionRepository;

@Service
public class LeccionService {

    @Autowired
    private LeccionRepository repository;

    public Leccion save(Leccion leccion) {
        return repository.save(leccion);
    }

    public Optional<Leccion> findById(String id) {
        return repository.findById(id);
    }

    public List<Leccion> findAll() {
        return repository.findAll();
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
    
    // Métodos personalizados adicionales
    public List<Leccion> findByCursoId(String cursoId) {
        return repository.findByCursoId(cursoId);
    }

    public List<Leccion> findByTipoLeccion( String tipoLeccion ) {
        return repository.findByTipoLeccion( tipoLeccion );
    }
}
