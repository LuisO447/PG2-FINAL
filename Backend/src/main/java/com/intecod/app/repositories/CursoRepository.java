package com.intecod.app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.intecod.app.entities.Curso;
import java.util.List;
import java.util.Optional;

public interface CursoRepository extends MongoRepository<Curso, String> {

    List<Curso> findByProfesorId(String profesorId);

    Optional<Curso> findByCodigoCurso( String codigoCurso );
    
}