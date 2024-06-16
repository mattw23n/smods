package com.smods.backend.model;

public class PlanModificationException extends RuntimeException{

    public PlanModificationException(){

    }
    public PlanModificationException(String message){
        super(message);
    }
}
