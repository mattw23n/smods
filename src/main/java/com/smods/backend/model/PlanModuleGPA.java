package com.smods.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.smods.backend.model.composite_key.PlanModuleGPAKey;
import jakarta.persistence.*;
import com.smods.backend.model.composite_key.PlanKey;

import java.util.Objects;

@Entity
@Table(name = "PLAN_MODULE_GPA")
public class PlanModuleGPA {

    @EmbeddedId
    private PlanModuleGPAKey planModuleGPAId;

    @Column(name = "GPA")
    private double gpa;

    @Column(name = "TERM", nullable = false)
    private int term;

    @Column(name = "IS_ERROR", nullable = false)
    private boolean isError = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumns({
            @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID"),
            @JoinColumn(name = "PLAN_ID", referencedColumnName = "PLAN_ID")
    })
    @MapsId("planKey")
    @JsonBackReference(value = "plan-planModuleGPA")
    private Plan plan;

    @ManyToOne
    @MapsId("moduleId")
    @JoinColumn(name = "MODULE_ID")
    private Module module;

    public PlanModuleGPA() {
    }

    public PlanModuleGPA(PlanModuleGPAKey planModuleGPAId, int term) {
        this.planModuleGPAId = planModuleGPAId;
        this.term = term;
    }

    public PlanModuleGPA(PlanModuleGPAKey planModuleGPAId, Module module, PlanKey planKey, int term) {
        this.planModuleGPAId = planModuleGPAId;
        this.module = module;
        this.plan = new Plan(planKey);
        this.term = term;
    }

    public PlanModuleGPAKey getPlanModuleGPAId() {
        return planModuleGPAId;
    }

    public void setPlanModuleGPAId(PlanModuleGPAKey planModuleGPAId) {
        this.planModuleGPAId = planModuleGPAId;
    }

    public double getGpa() {
        return gpa;
    }

    public void setGpa(double gpa) {
        this.gpa = gpa;
    }

    public int getTerm() {
        return term;
    }

    public void setTerm(int term) {
        this.term = term;
    }

    public boolean isError() {
        return isError;
    }

    public void setError(boolean error) {
        isError = error;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlanModuleGPA that = (PlanModuleGPA) o;
        return Double.compare(gpa, that.gpa) == 0 && term == that.term && Objects.equals(planModuleGPAId, that.planModuleGPAId) && Objects.equals(plan, that.plan) && Objects.equals(module, that.module);
    }

    @Override
    public int hashCode() {
        return Objects.hash(planModuleGPAId, gpa, term, plan, module);
    }

    @Override
    public String toString() {
        return "PlanModuleGPA{" +
                "planModuleGPAId=" + planModuleGPAId +
                ", gpa=" + gpa +
                ", term=" + term +
                ", plan=" + plan.getPlanKey() +
                ", module=" + module.getModuleId() +
                '}';
    }
}