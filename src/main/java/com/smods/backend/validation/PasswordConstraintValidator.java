package com.smods.backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class PasswordConstraintValidator implements ConstraintValidator<ValidPassword, String> {

    @Override
    public void initialize(ValidPassword constraintAnnotation) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null) {
            return false;
        }
        if (password.length() < 8 || password.length() > 20) {
            return false;
        }
        if (!Pattern.compile("[!@#$%^&*()\\-_=+{};:,<.>]").matcher(password).find()) {
            return false;
        }
        if (!Pattern.compile("[a-zA-Z]").matcher(password).find() || !Pattern.compile("[0-9]").matcher(password).find()) {
            return false;
        }
        return true;
    }
}