package com.intecod.app.services;

import org.springframework.beans.factory.annotation.Autowired;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

import com.intecod.app.security.TokenJwtConfig;

@Service
public class GenerateJWTService {


    private TokenJwtConfig tokenJwtConfig;
    

    public String generateToken(String correo, List<String> authorities ) {


        Claims claims = Jwts.claims();
        claims.put("authorities", authorities);  
        claims.put("correo", correo);
        claims.put("sub", correo);

        return Jwts.builder()
                .setSubject(correo)
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))  // 1 hora de validez
                .setIssuedAt(new Date())
                .signWith( tokenJwtConfig.SECRET_KEY )
                .compact();
    }

}