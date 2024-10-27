package com.intecod.app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.intecod.app.entities.Notificacion;
import java.util.List;

public interface NotificacionRepository extends MongoRepository<Notificacion, String> {
    List<Notificacion> findByUsuarioReceptorId(String usuarioReceptorId);
}
