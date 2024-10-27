package com.intecod.app.security;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import io.jsonwebtoken.SignatureAlgorithm;

public class TokenJwtConfig {

    private static final String SECRET_KEY_STRING = "yourSuperLongSecretKeyOfAtLeast32Characters!"; // Clave secreta segura

    public static final SecretKey SECRET_KEY = new SecretKeySpec(
            SECRET_KEY_STRING.getBytes(),
            SignatureAlgorithm.HS256.getJcaName()
    );
    public static final String PREFIX_TOKEN = "Bearer ";
    public static final String HEADER_AUTHORIZATION = "Authorization";
    public static final String CONTENT_TYPE = "application/json";
}