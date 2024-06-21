package com.smods.backend.model;

import com.smods.backend.model.Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class User {
    private String email;
    private Set<String> major;
    private Set<String> track;

}