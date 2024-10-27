package com.intecod.app.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intecod.app.entities.Notificacion;
import com.intecod.app.repositories.NotificacionRepository;

@Service
public class NotificacionService {

    @Autowired
    private NotificacionRepository repository;

    public Notificacion save(Notificacion notificacion) {
        return repository.save(notificacion);
    }

    public Optional<Notificacion> findById(String id) {
        return repository.findById(id);
    }

    public List<Notificacion> findAll() {
        return repository.findAll();
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    // Métodos personalizados adicionales
    public List<Notificacion> findByUsuarioReceptorId(String usuarioReceptorId) {
        return repository.findByUsuarioReceptorId(usuarioReceptorId);
    }

    public Notificacion marcarComoLeida(String id) {
    Optional<Notificacion> notificacionOpt = repository.findById(id);
    if (notificacionOpt.isPresent()) {
        Notificacion notificacion = notificacionOpt.get();
        notificacion.setLeido( !notificacion.getLeido() );
        return repository.save(notificacion);
    }
    throw new NoSuchElementException("Notificación no encontrada");
}
}

