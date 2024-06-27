package com.smods.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "PLAN_MODULE_PREASSIGNED_GPA")
public class PlanModulePreassignedGpa {
    @EmbeddedId
    private PlanModuleId id = new PlanModuleId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("pid")
    private Plan plan;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("cid")
    private Module module;

    private Float gpa;
    private String term;

    public PlanModuleId getId() {
        return id;
    }
    public void setId(PlanModuleId id) {
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

