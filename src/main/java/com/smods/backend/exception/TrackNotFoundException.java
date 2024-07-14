package com.smods.backend.exception;

public class TrackNotFoundException extends RuntimeException{
    public TrackNotFoundException(String message){
        super(message);
    }
}
