package com.smods.backend.exception;

public class PlanNameConflictException extends RuntimeException {
    public PlanNameConflictException(String message) {
        super(message);
    }
}