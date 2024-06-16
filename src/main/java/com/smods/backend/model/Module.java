package com.smods.backend.model;

import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class Module {
    private String cid;
    private String courseUnit;
    private Set<String> requirementsCompleted;
    private Set<Module> preRequisite;
    private double minBid;
    private double medianBid;
}
