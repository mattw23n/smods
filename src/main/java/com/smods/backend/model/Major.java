package com.smods.backend.model;

import jakarta.persistence.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Entity
@Table(name = "MAJOR")
@Inheritance(strategy = InheritanceType.JOINED)
public class Major {
    @Id
    @Column(name = "MAJOR_NAME")
    private String majorName;

    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    private List<MajorGradRequirement> majorGradRequirements;

    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    private List<MajorModule> majorModules;

    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    private List<PreassignedModule> preassignedModules;

    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    private List<Plan> plans;

    public Major() {
    }

    public String getMajorName() {
        return majorName;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName;
    }

    public List<MajorGradRequirement> getMajorGradRequirements() {
        return majorGradRequirements;
    }

    public void setMajorGradRequirements(List<MajorGradRequirement> majorGradRequirements) {
        this.majorGradRequirements = majorGradRequirements;
    }

    public List<MajorModule> getMajorModules() {
        return majorModules;
    }

    public void setMajorModules(List<MajorModule> majorModules) {
        this.majorModules = majorModules;
    }

    public List<PreassignedModule> getPreassignedModules() {
        return preassignedModules;
    }

    public void setPreassignedModules(List<PreassignedModule> preassignedModules) {
        this.preassignedModules = preassignedModules;
    }

    public List<Plan> getPlans() {
        return plans;
    }

    public void setPlans(List<Plan> plans) {
        this.plans = plans;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Major major = (Major) o;
        return Objects.equals(majorName, major.majorName) && Objects.equals(majorGradRequirements, major.majorGradRequirements) && Objects.equals(majorModules, major.majorModules) && Objects.equals(preassignedModules, major.preassignedModules) && Objects.equals(plans, major.plans);
    }

    @Override
    public int hashCode() {
        return Objects.hash(majorName, majorGradRequirements, majorModules, preassignedModules, plans);
    }

    @Override
    public String
    toString() {
        return "Major{" +
                "majorName='" + majorName + '\'' +
                ", majorGradRequirements=" + majorGradRequirements +
                ", majorModules=" + majorModules +
                ", preassignedModules=" + preassignedModules +
                ", plans=" + plans +
                '}';
    }
}
