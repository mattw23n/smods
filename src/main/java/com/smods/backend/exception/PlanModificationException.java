package com.smods.backend.exception;

public class PlanModificationException extends RuntimeException{

    public PlanModificationException(){

    }
    public PlanModificationException(String message){
        super(message);
    }
}
