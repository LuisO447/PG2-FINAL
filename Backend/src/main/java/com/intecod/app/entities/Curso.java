package com.intecod.app.entities;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cursos")
public class Curso {

    @Id
    private String id; 
    private String tipoCurso;
    private String nombre;
    private String seccion;
    private String escuela;
    private String codigoCurso;
    private String profesorId;
    private List<String> estudiantes;
    private List<String> lecciones;
    private List<String> bloqueados;
    private boolean activo = true;

    // Getters y Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTipoCurso() {
        return tipoCurso;
    }
    
    public void setTipoCurso(String tipoCurso) {
        this.tipoCurso = tipoCurso;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getSeccion() {
        return seccion;
    }

    public void setSeccion(String seccion) {
        this.seccion = seccion;
    }

    public String getEscuela() {
        return escuela;
    }

    public void setEscuela(String escuela) {
        this.escuela = escuela;
    }

    public String getCodigoCurso() {
        return codigoCurso;
    }

    public void setCodigoCurso(String codigoCurso) {
        this.codigoCurso = codigoCurso;
    }

    public String getProfesorId() {
        return profesorId;
    }

    public void setProfesorId(String profesorId) {
        this.profesorId = profesorId;
    }

    public List<String> getEstudiantes() {
        return estudiantes;
    }

    public void setEstudiantes(List<String> estudiantes) {
        this.estudiantes = estudiantes;
    }

    public List<String> getLecciones() {
        return lecciones;
    }

    public void setLecciones(List<String> lecciones) {
        this.lecciones = lecciones;
    }
    public List<String> getBloqueados() {
        return bloqueados;
    }

    public void setBloqueados(List<String> bloqueados) {
        this.bloqueados = bloqueados;
    }
    public boolean isActivo() {
        return activo;
    }
    
    public void setActivo(boolean activo) {
        this.activo = activo;
    }
}
