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

    @Column(name = "TERM")
    private int term;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", insertable = false, updatable = false),
            @JoinColumn(name = "PLAN_ID", referencedColumnName = "PLAN_ID", insertable = false, updatable = false)
    })
    @JsonBackReference(value = "plan-planModuleGPA")
    private Plan plan;

    @ManyToOne
    @JoinColumn(name = "MODULE_ID", referencedColumnName = "MODULE_ID", insertable = false, updatable = false)
    private Module module;

    public PlanModuleGPA() {
    }

    public PlanModuleGPA(PlanModuleGPAKey planModuleGPAId, int term) {
        this.planModuleGPAId = planModuleGPAId;
        this.term = term;
    }

    public PlanModuleGPA(PlanModuleGPAKey planModuleGPAId, Module module, PlanKey planKey, double gpa, int term) {
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
                ", plan=" + plan +
                ", module=" + module.getModuleId() +
                '}';
    }
}