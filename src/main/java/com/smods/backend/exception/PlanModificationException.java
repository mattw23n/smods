package com.smods.backend.model;

import java.lang.*;
public class PlanModificationException extends RuntimeException{

    public PlanModificationException(){

    }
    public PlanModificationException(String message){
        super(message);
    }
}
