package com.intecod.app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.intecod.app.entities.EvaluacionEstudiante;
import java.util.List;
import java.util.Optional;

public interface EvaluacionEstudianteRepository extends MongoRepository<EvaluacionEstudiante, String> {

    List<EvaluacionEstudiante> findByUsuarioId(String usuarioId);
    List<EvaluacionEstudiante> findByEvaluacionId(String evaluacionId);

    List<EvaluacionEstudiante> findByUsuarioIdAndCursoIdAndPonderacionGreaterThan( String usersId, String  cursotId, Integer ponderacion );

    Optional<EvaluacionEstudiante> findByUsuarioIdAndEvaluacionId( String usersId, String cursoId);

    void deleteByUsuarioIdAndCursoId(String usuarioId, String cursoId);

    void deleteByCursoId(String cursoId);

    Optional<EvaluacionEstudiante> findByUsuarioIdAndCursoIdAndEvaluacionIdAndProfesorId( String usuarioId, String cursoId, String evaluacionId, String profesorId );
}
