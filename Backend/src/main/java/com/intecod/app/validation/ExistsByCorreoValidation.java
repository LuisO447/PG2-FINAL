package com.intecod.app.validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.intecod.app.services.UserService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class ExistsByCorreoValidation implements ConstraintValidator<ExistsByCorreo, String> {

    @Autowired
    private UserService service;

    @Override
    public boolean isValid(String correo, ConstraintValidatorContext context) {
        if (service == null) {
            return true;
        }
        return !service.existsByCorreo(correo);
    }
}