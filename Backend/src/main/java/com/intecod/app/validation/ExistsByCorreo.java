package com.intecod.app.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Constraint(validatedBy = ExistsByCorreoValidation.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ExistsByCorreo {
    
    String message() default "El correo ya existe en la base de datos. ¡Escoja otro!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}