package com.smods.backend.model;

import com.smods.backend.model.composite_key.PlanModuleGPAKey;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "PLAN_MODULE_GPA")
public class PlanModuleGPA {
    @EmbeddedId
    private PlanModuleGPAKey planModuleGPAId;

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
    public PlanModuleGPA() {}

    // Constructor with parameters
    public PlanModuleGPA(PlanModuleGPAKey planModuleGPAId, Plan plan, Module module, Float gpa, String term) {
        this.planModuleGPAId = planModuleGPAId;
        this.plan = plan;
        this.module = module;
        this.gpa = gpa;
        this.term = term;
    }

    // Getters and Setters
    public PlanModuleGPAKey getId() {
        return planModuleGPAId;
    }

    public void setId(PlanModuleGPAKey planModuleGPAId) {
        this.planModuleGPAId = planModuleGPAId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlanModuleGpa that = (PlanModuleGpa) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(plan, that.plan) &&
                Objects.equals(module, that.module) &&
                Objects.equals(gpa, that.gpa) &&
                Objects.equals(term, that.term);
    }
    @Override
    public int hashCode() {
        return Objects.hash(id, plan, module, gpa, term);
    }

    @Override
    public String toString() {
        return "PlanModuleGpa{" +
                "id=" + id +
                ", plan=" + plan +
                ", module=" + module +
                ", gpa=" + gpa +
                ", term='" + term + '\'' +
                '}';
    }
}