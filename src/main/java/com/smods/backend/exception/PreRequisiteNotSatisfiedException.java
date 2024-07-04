package com.smods.backend.exception;

public class PreRequisiteNotSatisfiedException extends RuntimeException {
    public PreRequisiteNotSatisfiedException(String message) {
        super(message);
    }
}