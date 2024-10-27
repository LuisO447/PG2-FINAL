package com.intecod.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.intecod.app.entities.User;
import java.util.ArrayList;
import java.util.List;

@Service
public class MongoUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;  // Usamos el servicio en lugar del repositorio

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        
        // Buscar el usuario por correo usando el UserService
        User user = userService.findByCorreo(correo);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("Correo %s no existe en el sistema!", correo));
        }

        // Asignar el rol correspondiente al usuario
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getTipo_usuario())); // Asigna el tipo_usuario como autoridad

        // Crear un UserDetails con roles
        return new org.springframework.security.core.userdetails.User(
                user.getCorreo(),  // Aquí se usa el correo como identificador
                user.getContrasena(),  // Contrasena cifrada
                true,  // enabled
                true,  // accountNonExpired
                true,  // credentialsNonExpired
                true,  // accountNonLocked
                authorities  // Asignar las autoridades
        );
    }
}