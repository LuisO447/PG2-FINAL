package com.intecod.app.entities;
import java.util.Date;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "evaluaciones_x_estudiante")
public class EvaluacionEstudiante {

    @Id
    private String id;

    private String usuarioId;
    private String profesorId;
    private String cursoId;
    private String evaluacionId;
    private String enlaceResultado;
    private List<Object> cuestionarioEstudiante;
    private Integer ponderacion;
    private Date fechaEvaluacion;

    // Getters y Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(String usuarioId) {
        this.usuarioId = usuarioId;
    }


    public String getProfesorId() {
        return profesorId;
    }

    public void setProfesorId(String profesorId) {
        this.profesorId = profesorId;
    }

    public String getCursoId() {
        return cursoId;
    }

    public void setCursoId(String cursoId) {
        this.cursoId = cursoId;
    }



    public String getEvaluacionId() {
        return evaluacionId;
    }

    public void setEvaluacionId(String evaluacionId) {
        this.evaluacionId = evaluacionId;
    }

    public String getEnlaceResultado() {
        return enlaceResultado;
    }

    public void setEnlaceResultado(String enlaceResultado) {
        this.enlaceResultado = enlaceResultado;
    }

    public List<Object> getCuestionarioEstudiante() {
        return cuestionarioEstudiante;
    }

    public void setCuestionarioEstudiante(List<Object> cuestionarioEstudiante) {
        this.cuestionarioEstudiante = cuestionarioEstudiante;
    }

    public Integer getPonderacion() {
        return ponderacion;
    }

    public void setPonderacion(Integer ponderacion) {
        this.ponderacion = ponderacion;
    }

    public Date getFechaEvaluacion() {
        return fechaEvaluacion;
    }

    public void setFechaEvaluacion(Date fechaEvaluacion) {
        this.fechaEvaluacion = fechaEvaluacion;
    }
}