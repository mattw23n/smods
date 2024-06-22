package com.smods.backend.exception;

import java.lang.*;
public class PlanModificationException extends RuntimeException{

    public PlanModificationException(){

    }
    public PlanModificationException(String message){
        super(message);
    }
}
