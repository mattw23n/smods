package com.smods.backend.model;

import com.smods.backend.model.Module;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Entity
public class User {

    private String email;
    private Set<String> major;
    private Set<String> track;

    private Set<Plan> plans;


}