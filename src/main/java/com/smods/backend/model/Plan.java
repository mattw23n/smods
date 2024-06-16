package com.smods.backend.model;

import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class Plan {
    private String name;
    private String degree;
    private String track;
    private Set<Module> exemptions;
    private Set<Module> plannedModules;

    public Plan(String name, String degree, String track, Set<Module> exemptions) {
        this.name = name;
        this.degree = degree;
        this.track = track;
        this.exemptions = exemptions;
        this.plannedModules = new HashSet<Module>();
    }

    public void addModule(Module module){
        if (plannedModules.contains(module)){
            throw new PlanModificationException("you already picked this module");
        }
        plannedModules.add(module);
    }

    public void removeModule(Module module){
        if (!plannedModules.contains(module)){
            throw new PlanModificationException("you have not picked this module yet");
        }
        plannedModules.remove(module);
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
