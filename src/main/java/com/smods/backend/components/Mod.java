package com.smods.backend.components;

import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class Mod {
    private String cid;
    private String courseUnit;
    private Set<String> requirementsCompleted;
    private Set<Mod> preRequisite;
    private double minBid;
    private double medianBid;

    public String toString(){
        return "setter injection works";
    }
}
