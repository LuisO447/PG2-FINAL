package com.intecod.app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.intecod.app.entities.Leccion;
import java.util.List;

public interface LeccionRepository extends MongoRepository<Leccion, String> {

    List<Leccion> findByCursoId(String cursoId);

    List<Leccion> findByTipoLeccion( String tipoLeccion );
}
