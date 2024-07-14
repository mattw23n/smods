package com.smods.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JsonBackReference(value = "plan-planModuleGPA")
    private Plan plan;

    @ManyToOne
    @MapsId("moduleId")
    @JoinColumn(name = "MODULE_ID")
    private Module module;

    @Column(name = "GPA")
    private Float gpa;

    @Column(name = "TERM")
    private int term;

    // null if not a major module
    @Column(name = "MAJOR")
    private String major;

    // null if not a track module
    @Column(name = "TRACK")
    private String track;

    @Column(name = "REQUIREMENT")
    private String requirement;

    @Column(name = "SUBREQUIREMENT")
    private String subrequirement;

    // Default constructor
    public PlanModuleGPA() {}



    // Constructor with parameters
<<<<<<< HEAD
=======


    public PlanModuleGPA(PlanModuleGPAKey planModuleGPAId, Plan plan, Module module, int term) {
        this.planModuleGPAId = planModuleGPAId;
        this.plan = plan;
        this.module = module;
        this.term = term;

        // fill in the rest of the attributes based on degree and track of module and plan
    }

>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    public PlanModuleGPA(PlanModuleGPAKey planModuleGPAId, int term) {
        this.planModuleGPAId = planModuleGPAId;
        this.term = term;
    }

    // Getters and Setters
    public PlanModuleGPAKey getPlanModuleGPAId() {
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

    public int getTerm() {
        return term;
    }

    public void setTerm(int term) {
        this.term = term;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getTrack() {
        return track;
    }

    public void setTrack(String track) {
        this.track = track;
    }

    public String getRequirement() {
        return requirement;
    }

    public void setRequirement(String requirement) {
        this.requirement = requirement;
    }

    public String getSubrequirement() {
        return subrequirement;
    }

    public void setSubrequirement(String subrequirement) {
        this.subrequirement = subrequirement;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlanModuleGPA that = (PlanModuleGPA) o;
        return Objects.equals(planModuleGPAId, that.planModuleGPAId) &&
                Objects.equals(plan, that.plan) &&
                Objects.equals(module, that.module) &&
                Objects.equals(gpa, that.gpa) &&
                Objects.equals(term, that.term);
    }
    @Override
    public int hashCode() {
        return Objects.hash(planModuleGPAId, plan, module, gpa, term);
    }

    @Override
    public String toString() {
        return "PlanModuleGPA{" +
                "id=" + planModuleGPAId +
                ", plan=" + plan +
                ", module=" + module +
                ", gpa=" + gpa +
                ", term='" + term + '\'' +
                '}';
    }
}