package com.smods.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;

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

    @ElementCollection
    @CollectionTable(name = "MAJOR_GRAD_REQUIREMENT", joinColumns = @JoinColumn(name = "MAJOR_NAME"))
    @MapKeyColumn(name = "REQUIREMENT_TYPE")
    @Column(name = "COURSE_UNIT")
    private Map<String, Double> majorGradRequirements;

    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    private List<MajorModule> majorModules;

    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    private List<Module> modules;

    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    private List<PreassignedModule> preassignedModules;

    @ManyToMany(mappedBy = "majors", cascade = CascadeType.ALL)
    private List<Plan> plans;

    public Major() {
    }

    public Major(String majorName) {
        this.majorName = majorName;
    }

    public String getMajorName() {
        return majorName;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName;
    }

    public Map<String, Double> getGradRequirements() {
        return majorGradRequirements;
    }

    public Map<String, Double> getMajorGradRequirements() {
        return majorGradRequirements;
    }

    public void setMajorGradRequirements(Map<String, Double> majorGradRequirements) {
        this.majorGradRequirements = majorGradRequirements;
    }

    public List<MajorModule> getMajorModules() {
        return majorModules;
    }

    public void setMajorModules(List<MajorModule> majorModules) {
        this.majorModules = majorModules;
    }

    public List<Plan> getPlans() {
        return plans;
    }

    public void setPlans(List<Plan> plans) {
        this.plans = plans;
    }

    public List<Module> getModules() {
        return modules;
    }

    public void setModules(List<Module> modules) {
        this.modules = modules;
    }

    public List<PreassignedModule> getPreassignedModules() {
        return preassignedModules;
    }

    public void setPreassignedModules(List<PreassignedModule> preassignedModules) {
        this.preassignedModules = preassignedModules;
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
    public String toString() {
        return "Major{" +
                "majorName='" + majorName + '\'' +
                ", majorGradRequirements=" + majorGradRequirements +
                ", majorModules=" + majorModules +
                ", modules=" + modules +
                ", preassignedModules=" + preassignedModules +
                ", plans=" + plans +
                '}';
    }
}
