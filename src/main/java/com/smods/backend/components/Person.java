package com.smods.backend.components;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class Person {
    private String email;
    private Set<String> major;
    private Set<String> track;
    private Set<Mod> mods = new HashSet<>();
    @Autowired
    public Person(Mod mod){
        this.mods.add(mod);
    }

    public String toString(){
        return "constructor injection works: " + mods.toString();
    }
}