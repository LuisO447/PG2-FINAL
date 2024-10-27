package com.intecod.app.entities;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lecciones")
public class Leccion {

    @Id
    private String id;

    private String titulo;
    private List<Object> contenido;
    private String cursoId;
    private String tipoLeccion;
    private List<String> evaluaciones;
    private List<Object> miniLecciones;

    // Getters y Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public List<Object> getContenido() {
        return contenido;
    }

    public void setContenido(List<Object> contenido) {
        this.contenido = contenido;
    }

    public String getCursoId() {
        return cursoId;
    }

    public void setCursoId(String cursoId) {
        this.cursoId = cursoId;
    }

    public String getTipoLeccion() {
        return tipoLeccion;
    }

    public void setTipoLeccion(String tipoLeccion) {
        this.tipoLeccion = tipoLeccion;
    }

    public List<String> getEvaluaciones() {
        return evaluaciones;
    }

    public void setEvaluaciones(List<String> evaluaciones) {
        this.evaluaciones = evaluaciones;
    }

    public List<Object> getMiniLecciones() {
        return miniLecciones;
    }

    public void setMiniLecciones(List<Object> miniLecciones) {
        this.miniLecciones = miniLecciones;
    }
}
