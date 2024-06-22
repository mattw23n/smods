package com.smods.backend.model;

import com.smods.backend.exception.PlanModificationException;
import jakarta.persistence.*;
import java.util.*;

@Entity
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "degree")
    private String degree;

    @Column(name = "track")
    private String track;

    @Column(name = "exemptions")
    private Set<Module> exemptions = new HashSet<>();

    @ManyToMany
    @Column(name = "plannedModules")
    private Set<Module> plannedModules = new HashSet<>();

    public Plan() {
        // Default constructor for JPA
    }

    public Plan(String name, String degree, String track, Set<Module> exemptions) {
        this.name = name;
        this.degree = degree;
        this.track = track;
        this.exemptions = exemptions;
    }

    public void addModule(Module module) {
        if (plannedModules.contains(module)) {
            throw new PlanModificationException("You already picked this module");
        }
        plannedModules.add(module);
    }

    public void removeModule(Module module) {
        if (!plannedModules.contains(module)) {
            throw new PlanModificationException("You have not picked this module yet");
        }
        plannedModules.remove(module);
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getTrack() {
        return track;
    }

    public void setTrack(String track) {
        this.track = track;
    }

    public Set<Module> getExemptions() {
        return exemptions;
    }

    public void setExemptions(Set<Module> exemptions) {
        this.exemptions = exemptions;
    }

    public Set<Module> getPlannedModules() {
        return plannedModules;
    }

    public void setPlannedModules(Set<Module> plannedModules) {
        this.plannedModules = plannedModules;
    }
}