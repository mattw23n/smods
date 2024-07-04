package com.smods.backend.exception;

public class CoRequisiteNotSatisfiedException extends RuntimeException {
    public CoRequisiteNotSatisfiedException(String message) {
        super(message);
    }
}