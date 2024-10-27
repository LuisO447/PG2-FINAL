package com.intecod.app.security.filter;

import static com.intecod.app.security.TokenJwtConfig.CONTENT_TYPE;
import static com.intecod.app.security.TokenJwtConfig.HEADER_AUTHORIZATION;
import static com.intecod.app.security.TokenJwtConfig.PREFIX_TOKEN;
import static com.intecod.app.security.TokenJwtConfig.SECRET_KEY;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intecod.app.security.SimpleGrantedAuthorityJsonCreator;
import com.intecod.app.security.mixin.SimpleGrantedAuthorityMixIn;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtValidationFilter extends BasicAuthenticationFilter {

    public JwtValidationFilter(AuthenticationManager authenticationManager) {
            super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String header = request.getHeader(HEADER_AUTHORIZATION);

        if (header == null || !header.startsWith(PREFIX_TOKEN)) {
            chain.doFilter(request, response);
            return;
        }

        String token = header.replace(PREFIX_TOKEN, "");

        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
            String correo = claims.getSubject();  // Cambiado a 'correo'

            // Obtén las autoridades como una lista de strings
            List<String> authoritiesList = claims.get("authorities", List.class);

            // Convertir la lista de strings a GrantedAuthority
            Collection<? extends GrantedAuthority> authorities = authoritiesList.stream()
                    .map(SimpleGrantedAuthority::new)  // Crear SimpleGrantedAuthority por cada autoridad
                    .collect(Collectors.toList());

            // Asigna las autoridades correctamente en el contexto de Spring Security
            UsernamePasswordAuthenticationToken authenticationToken =  new UsernamePasswordAuthenticationToken( correo, null, authorities);

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            chain.doFilter(request, response);

        } catch (JwtException e) {
            
            Map<String, Object> body = new HashMap<>();
            body.put("valid", false);
            body.put("error", e.getMessage());
            body.put("message", "JWT Token no válido");

            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(CONTENT_TYPE);
        }
    }
}