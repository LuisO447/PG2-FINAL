package com.intecod.app.entities;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "evaluaciones")
public class Evaluacion {

    @Id
    private String id;

    private String leccionId;
    private String tipo;
    private Integer puntajeMaximo;
    private Boolean intentosIlimitados;
    private Integer tiempoLimite;
    private List<Object> cuestionario;

    // Getters y Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLeccionId() {
        return leccionId;
    }

    public void setLeccionId(String leccionId) {
        this.leccionId = leccionId;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Integer getPuntajeMaximo() {
        return puntajeMaximo;
    }

    public void setPuntajeMaximo(Integer puntajeMaximo) {
        this.puntajeMaximo = puntajeMaximo;
    }

    public Boolean getIntentosIlimitados() {
        return intentosIlimitados;
    }

    public void setIntentosIlimitados(Boolean intentosIlimitados) {
        this.intentosIlimitados = intentosIlimitados;
    }

    public Integer getTiempoLimite() {
        return tiempoLimite;
    }

    public void setTiempoLimite(Integer tiempoLimite) {
        this.tiempoLimite = tiempoLimite;
    }

    public List<Object> getCuestionario() {
        return cuestionario;
    }

    public void setCuestionario(List<Object> cuestionario) {
        this.cuestionario = cuestionario;
    }
}