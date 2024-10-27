package com.intecod.app.entities;
import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notificaciones")
public class Notificacion {

    @Id
    private String id;

    private String usuarioEmisorId;
    private String usuarioReceptorId;
    private String contenido;
    private String tipoNotificacion;
    private Date fechaEnvio;
    private Boolean leido;

    private String evaluacionXEstudianteId;


    // Getters y Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsuarioEmisorId() {
        return usuarioEmisorId;
    }

    public void setUsuarioEmisorId(String usuarioEmisorId) {
        this.usuarioEmisorId = usuarioEmisorId;
    }

    public String getUsuarioReceptorId() {
        return usuarioReceptorId;
    }

    public void setUsuarioReceptorId(String usuarioReceptorId) {
        this.usuarioReceptorId = usuarioReceptorId;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public String getTipoNotificacion() {
        return tipoNotificacion;
    }

    public void setTipoNotificacion(String tipoNotificacion) {
        this.tipoNotificacion = tipoNotificacion;
    }

    public Date getFechaEnvio() {
        return fechaEnvio;
    }

    public void setFechaEnvio(Date fechaEnvio) {
        this.fechaEnvio = fechaEnvio;
    }

    public Boolean getLeido() {
        return leido;
    }

    public void setLeido(Boolean leido) {
        this.leido = leido;
    }

    public String getEvaluacionXEstudianteId() {
        return evaluacionXEstudianteId;
    }

    public void setEvaluacionXEstudianteId( String evaluacionXEstudianteId ){
        this.evaluacionXEstudianteId = evaluacionXEstudianteId;
    }

}
