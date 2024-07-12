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
    @CollectionTable(name = "GRAD_REQUIREMENT", joinColumns = @JoinColumn(name = "MAJOR_NAME"))
    @MapKeyColumn(name = "REQUIREMENT_TYPE")
    @Column(name = "COURSE_UNIT")
    private Map<String, Double> gradRequirements;

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
        return gradRequirements;
    }

    public void setGradRequirements(Map<String, Double> gradRequirements) {
        this.gradRequirements = gradRequirements;
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
        return Objects.equals(majorName, major.majorName) && Objects.equals(gradRequirements, major.gradRequirements) && Objects.equals(modules, major.modules) && Objects.equals(preassignedModules, major.preassignedModules);
    }

    @Override
    public int hashCode() {
        return Objects.hash(majorName, gradRequirements, modules, preassignedModules);
    }

    @Override
    public String toString() {
        return "Major{" +
                "majorName='" + majorName + '\'' +
                ", gradRequirements=" + gradRequirements +
                ", modules=" + modules +
                ", preassignedModules=" + preassignedModules +
                '}';
    }
}
