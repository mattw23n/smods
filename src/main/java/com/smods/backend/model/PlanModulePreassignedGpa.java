package com.smods.backend.model;

import com.smods.backend.model.composite_key.PlanModulePreassignedGpaKey;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "PLAN_MODULE_PREASSIGNED_GPA")
public class PlanModulePreassignedGpa {

    @EmbeddedId
    private PlanModulePreassignedGpaKey id;

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
    public PlanModulePreassignedGpa() {}

    // Constructor with parameters
    public PlanModulePreassignedGpa(PlanModulePreassignedGpaKey id, Plan plan, Module module, Float gpa, String term) {
        this.id = id;
        this.plan = plan;
        this.module = module;
        this.gpa = gpa;
        this.term = term;
    }

    // Getters and Setters
    public PlanModulePreassignedGpaKey getId() {
        return id;
    }

    public void setId(PlanModulePreassignedGpaKey id) {
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
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlanModulePreassignedGpa that = (PlanModulePreassignedGpa) o;
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
        return "PlanModulePreassignedGpa{" +
                "id=" + id +
                ", plan=" + plan +
                ", module=" + module +
                ", gpa=" + gpa +
                ", term='" + term + '\'' +
                '}';
    }
}
