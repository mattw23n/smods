package com.smods.backend.exception;

public class VerificationTokenNotFoundException extends RuntimeException{
    public VerificationTokenNotFoundException(String message) {
        super(message);
    }
}
