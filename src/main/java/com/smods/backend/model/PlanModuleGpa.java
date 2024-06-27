package com.smods.backend.model;

import com.smods.backend.model.composite_key.PlanModuleGpaKey;
import jakarta.persistence.*;

@Entity
@Table(name = "PLAN_MODULE_GPA")
public class PlanModuleGpa {
    @EmbeddedId
    private PlanModuleGpaKey id;

    @ManyToOne
    @MapsId("pid")
    @JoinColumn(name = "PID")
    private Plan plan;

    @ManyToOne
    @MapsId("mid")
    @JoinColumn(name = "MID")
    private Module module;

    @Column(name = "GPA")
    private Float gpa;

    @Column(name = "TERM")
    private String term;

    // Default constructor
    public PlanModuleGpa() {}

    // Constructor with parameters
    public PlanModuleGpa(PlanModuleGpaKey id, Plan plan, Module module, Float gpa, String term) {
        this.id = id;
        this.plan = plan;
        this.module = module;
        this.gpa = gpa;
        this.term = term;
    }

    // Getters and Setters
    public PlanModuleGpaKey getId() {
        return id;
    }

    public void setId(PlanModuleGpaKey id) {
        this.id = id;
    }

    public Plan getPlan() {
        return plan;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public Float getGpa() {
        return gpa;
    }

    public void setGpa(Float gpa) {
        this.gpa = gpa;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }
}
