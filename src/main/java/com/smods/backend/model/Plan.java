package com.smods.backend.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String degree;
    private String track;

    @ManyToMany
    @JoinTable(
            name = "plan_exemptions",
            joinColumns = @JoinColumn(name = "plan_id"),
            inverseJoinColumns = @JoinColumn(name = "module_id")
    )
    private Set<Module> exemptions = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "plan_modules",
            joinColumns = @JoinColumn(name = "plan_id"),
            inverseJoinColumns = @JoinColumn(name = "module_id")
    )
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