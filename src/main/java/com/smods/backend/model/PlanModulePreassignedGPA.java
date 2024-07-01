package com.smods.backend.model;

import com.smods.backend.model.composite_key.PlanModulePreassignedGPAKey;
import jakarta.persistence.*;

@Entity
@Table(name = "PLAN_MODULE_PREASSIGNED_GPA")
public class PlanModulePreassignedGPA {

    @EmbeddedId
    private PlanModulePreassignedGPAKey planModulePreassignedGPAId;

    @ManyToOne
    @MapsId("planId")
    @JoinColumns({
            @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID"),
            @JoinColumn(name = "PLAN_ID", referencedColumnName = "PLAN_ID")
    })
    private Plan plan;

    @ManyToOne
    @MapsId("moduleId")
    @JoinColumn(name = "MODULE_ID")
    private Module module;

    @Column(name = "GPA")
    private Float gpa;

    @Column(name = "TERM")
    private String term;

    // Default constructor
    public PlanModulePreassignedGPA() {}

    // Constructor with parameters

    public PlanModulePreassignedGPA(PlanModulePreassignedGPAKey planModulePreassignedGPAId, Plan plan, Module module, Float gpa, String term) {
        this.planModulePreassignedGPAId = planModulePreassignedGPAId;
        this.plan = plan;
        this.module = module;
        this.gpa = gpa;
        this.term = term;
    }

    public PlanModulePreassignedGPAKey getPlanModulePreassignedGPAId() {
        return planModulePreassignedGPAId;
    }

    public void setPlanModulePreassignedGPAId(PlanModulePreassignedGPAKey planModulePreassignedGPAId) {
        this.planModulePreassignedGPAId = planModulePreassignedGPAId;
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
