package com.intecod.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intecod.app.entities.EvaluacionEstudiante;
import com.intecod.app.repositories.EvaluacionEstudianteRepository;

@Service
public class EvaluacionEstudianteService {

    @Autowired
    private EvaluacionEstudianteRepository repository;

    public EvaluacionEstudiante save(EvaluacionEstudiante evaluacionEstudiante) {
        return repository.save(evaluacionEstudiante);
    }

    public Optional<EvaluacionEstudiante> findById(String id) {
        return repository.findById(id);
    }

    public List<EvaluacionEstudiante> findAll() {
        return repository.findAll();
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    // Métodos personalizados adicionales
    public List<EvaluacionEstudiante> findByUsuarioId(String usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

    public List<EvaluacionEstudiante> findByEvaluacionId(String evaluacionId) {
        return repository.findByEvaluacionId(evaluacionId);
    }

    public List<EvaluacionEstudiante> findByUsuarioIdAndCursoIdAndPonderacionGreaterThan( String usersId, String cursotId, Integer ponderacion ){
        return repository.findByUsuarioIdAndCursoIdAndPonderacionGreaterThan( usersId, cursotId, ponderacion );
    }

    public Optional<EvaluacionEstudiante> findByUsuarioIdAndEvaluacionId( String usersId, String cursoId ){
        return repository.findByUsuarioIdAndEvaluacionId( usersId, cursoId );
    }

    public void deleteByUsuarioIdAndCursoId(String usuarioId, String cursoId){
        repository.deleteByUsuarioIdAndCursoId( usuarioId, cursoId );
    }

    public void eliminarPorCursoId(String cursoId) {
        repository.deleteByCursoId(cursoId);
    }

    public Optional<EvaluacionEstudiante> findByUsuarioIdAndCursoIdAndEvaluacionIdAndProfesorId( String usuarioId, String cursoId, String evaluacionId, String profesorId ){
        return repository.findByUsuarioIdAndCursoIdAndEvaluacionIdAndProfesorId( usuarioId, cursoId, evaluacionId, profesorId  );
    }

    
}

