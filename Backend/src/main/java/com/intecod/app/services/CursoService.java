package com.intecod.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intecod.app.entities.Curso;
import com.intecod.app.repositories.CursoRepository;

@Service
public class CursoService {

    @Autowired
    private CursoRepository repository;

    public Curso save(Curso curso) {
        return repository.save(curso);
    }

    public Optional<Curso> findById(String id) {
        return repository.findById(id);
    }

    public List<Curso> findAll() {
        return repository.findAll();
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
    
    // Métodos personalizados adicionales
    public List<Curso> findByProfesorId(String profesorId) {
        return repository.findByProfesorId(profesorId);
    }

    // Métodos personalizados adicionales
    public Optional<Curso> findByCursoCodigo( String codigoCurso ) {
        return repository.findByCodigoCurso( codigoCurso );
    }

}