package com.intecod.app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.intecod.app.entities.Evaluacion;
import java.util.List;

public interface EvaluacionRepository extends MongoRepository<Evaluacion, String> {

    List<Evaluacion> findByLeccionId(String leccionId);
}
