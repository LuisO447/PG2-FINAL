package com.intecod.app.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import java.security.SecureRandom;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "usuarios")
public class User {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final SecureRandom random = new SecureRandom();

    @Id
    private String id;

    private String nombre_completo;
    private String correo;
    private Integer edad;
    private String sexo;
    private String contrasena;
    private String tipo_usuario;
    private List<String> cursos_asignados;
    private List<String> notificaciones;
    private String tokenRecuperacion;
    private Date último_inicio_sesión;

    // Constructor vacío
    public User() {
    }

    // Getters y Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre_completo() {
        return nombre_completo;
    }

    public void setNombre_completo(String nombre_completo) {
        this.nombre_completo = nombre_completo;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
            this.contrasena = contrasena ;
    }

    public String getTipo_usuario() {
        return tipo_usuario;
    }

    public void setTipo_usuario(String tipo_usuario) {
        this.tipo_usuario = tipo_usuario;
    }

    public List<String> getCursos_asignados() {
        return cursos_asignados;
    }

    public void setCursos_asignados(List<String> cursos_asignados) {
        this.cursos_asignados = cursos_asignados;
    }

    public List<String> getNotificaciones() {
        return notificaciones;
    }

    public void setNotificaciones(List<String> notificaciones) {
        this.notificaciones = notificaciones;
    }

    public String getTokenRecuperacion() {
        return tokenRecuperacion;
    }

    public void setTokenRecuperacion(String token_recuperacion) {
        this.tokenRecuperacion = token_recuperacion;
    }

    public Date getÚltimo_inicio_sesión() {
        return último_inicio_sesión;
    }

    public void setÚltimo_inicio_sesión(Date último_inicio_sesión) {
        this.último_inicio_sesión = último_inicio_sesión;
    }

    public String generateRecoveryToken( int length ){

        StringBuilder token = new StringBuilder( length );

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(CHARACTERS.length());
            token.append(CHARACTERS.charAt(index));
        }

        return token.toString();
    }

    // hashCode, equals, y toString

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((correo == null) ? 0 : correo.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        User other = (User) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (correo == null) {
            if (other.correo != null)
                return false;
        } else if (!correo.equals(other.correo))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", nombre_completo=" + nombre_completo + ", correo=" + correo + ", edad=" + edad
                + ", sexo=" + sexo + ", tipo_usuario=" + tipo_usuario + "]," + "notifcaciones=" + notificaciones;
    }
}