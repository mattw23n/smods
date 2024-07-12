package com.smods.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.smods.backend.model.composite_key.PreassignedModuleKey;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "PREASSIGNED_MODULE")
public class PreassignedModule {

    @EmbeddedId
    private PreassignedModuleKey preassignedModuleKey;

    @ManyToOne
    @MapsId("planId")
    @JoinColumns({
            @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID"),
            @JoinColumn(name = "PLAN_ID", referencedColumnName = "PLAN_ID")
    })
    @JsonBackReference(value = "plan-planModulePreassignedGPA")
    private Plan plan;

    @ManyToOne
    @MapsId("moduleId")
    @JoinColumn(name = "MODULE_ID")
    private Module module;

    @ManyToOne
    @MapsId("majorName")
    @JoinColumn(name = "MAJOR_NAME")
    private Major major;

    @Column(name = "GPA")
    private Float gpa;

    @Column(name = "TERM")
    private int term;

    // Default constructor
    public PreassignedModule() {}

    // Constructor with parameters


    public PreassignedModule(Plan plan, Module module, Major major, int term) {
        this.plan = plan;
        this.module = module;
        this.major = major;
        this.term = term;
    }

    public PreassignedModuleKey getPreassignedModuleKey() {
        return preassignedModuleKey;
    }

    public void setPreassignedModuleKey(PreassignedModuleKey preassignedModuleKey) {
        this.preassignedModuleKey = preassignedModuleKey;
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

    public Major getMajor() {
        return major;
    }

    public void setMajor(Major major) {
        this.major = major;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PreassignedModule that = (PreassignedModule) o;
        return term == that.term && Objects.equals(preassignedModuleKey, that.preassignedModuleKey) && Objects.equals(plan, that.plan) && Objects.equals(module, that.module) && Objects.equals(major, that.major) && Objects.equals(gpa, that.gpa);
    }

    @Override
    public int hashCode() {
        return Objects.hash(preassignedModuleKey, plan, module, major, gpa, term);
    }

    @Override
    public String toString() {
        return "PreassignedModule{" +
                "preassignedModuleKey=" + preassignedModuleKey +
                ", plan=" + plan +
                ", module=" + module +
                ", major=" + major +
                ", gpa=" + gpa +
                ", term=" + term +
                '}';
    }
}
