package com.smods.backend.exception;

public class MutuallyExclusiveConflictException extends RuntimeException {
    public MutuallyExclusiveConflictException(String message) {
        super(message);
    }
}