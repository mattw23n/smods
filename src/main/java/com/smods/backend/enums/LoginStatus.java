package com.smods.backend.enums;

public enum LoginStatus {
    SUCCESS("Login successful"),
    EMAIL_NOT_VERIFIED("Please verify your email"),
    INVALID_CREDENTIALS("Invalid username or password");

    private final String message;

    LoginStatus(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}