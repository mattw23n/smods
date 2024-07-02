package com.smods.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "MODULE")
public class Module {

    @Id
    @Column(name = "MODULE_ID")
    private String moduleId;

    @Column(name = "MODULE_NAME")
    private String name;

    @Column(name = "COURSE_UNIT")
    private Float courseUnit;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<PlanModuleGPA> planModuleGPAs;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<PlanModulePreassignedGPA> planModulePreassignedGPAs;

    @ManyToMany
    @JoinTable(
            name = "PRE_REQUISITE",
            joinColumns = @JoinColumn(name = "MODULE_ID"),
            inverseJoinColumns = @JoinColumn(name = "MODULE_ID2")
    )
    private List<Module> preRequisites;

    @ManyToMany(mappedBy = "preRequisites")
    @JsonBackReference
    private List<Module> preRequisiteDependents;

    @ManyToMany
    @JoinTable(
            name = "CO_REQUISITE",
            joinColumns = @JoinColumn(name = "MODULE_ID"),
            inverseJoinColumns = @JoinColumn(name = "MODULE_ID2")
    )
    private List<Module> coRequisites;

    @ManyToMany(mappedBy = "coRequisites")
    @JsonBackReference
    private List<Module> corequisiteDependents;

    @ManyToMany
    @JoinTable(
            name = "MUTUALLY_EXCLUSIVE",
            joinColumns = @JoinColumn(name = "MODULE_ID"),
            inverseJoinColumns = @JoinColumn(name = "MODULE_ID2")
    )
    private List<Module> mutuallyExclusives;

    @ManyToMany(mappedBy = "mutuallyExclusives")
    @JsonBackReference
    private List<Module> mutuallyExclusiveWith;

    @ElementCollection
    @CollectionTable(name = "GRAD_REQUIREMENT", joinColumns = @JoinColumn(name = "MODULE_ID"))
    @Column(name = "requirement")
    private List<String> requirements;

    // Default constructor
    public Module() {}

    // Constructor
    public Module(String moduleId, String name, Float courseUnit) {
        this.moduleId = moduleId;
        this.name = name;
        this.courseUnit = courseUnit;
    }

    // Getters and Setters
    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getCourseUnit() {
        return courseUnit;
    }

    public void setCourseUnit(Float courseUnit) {
        this.courseUnit = courseUnit;
    }

    public List<PlanModuleGPA> getPlanModuleGPAs() {
        return planModuleGPAs;
    }

    public void setPlanModuleGPAs(List<PlanModuleGPA> planModuleGPAs) {
        this.planModuleGPAs = planModuleGPAs;
    }

    public List<PlanModulePreassignedGPA> getPlanModulePreassignedGPAs() {
        return planModulePreassignedGPAs;
    }

    public void setPlanModulePreassignedGPAs(List<PlanModulePreassignedGPA> planModulePreassignedGPAs) {
        this.planModulePreassignedGPAs = planModulePreassignedGPAs;
    }

    public List<Module> getPreRequisites() {
        return preRequisites;
    }

    public void setPreRequisites(List<Module> preRequisites) {
        this.preRequisites = preRequisites;
    }

    public List<Module> getPreRequisiteDependents() {
        return preRequisiteDependents;
    }

    public void setPreRequisiteDependents(List<Module> preRequisiteDependents) {
        this.preRequisiteDependents = preRequisiteDependents;
    }

    public List<Module> getCorequisites() {
        return coRequisites;
    }

    public void setCorequisites(List<Module> coRequisites) {
        this.coRequisites = coRequisites;
    }

    public List<Module> getCorequisiteDependents() {
        return corequisiteDependents;
    }

    public void setCorequisiteDependents(List<Module> corequisiteDependents) {
        this.corequisiteDependents = corequisiteDependents;
    }

    public List<Module> getMutuallyExclusives() {
        return mutuallyExclusives;
    }

    public void setMutuallyExclusives(List<Module> mutuallyExclusives) {
        this.mutuallyExclusives = mutuallyExclusives;
    }

    public List<Module> getMutuallyExclusiveWith() {
        return mutuallyExclusiveWith;
    }

    public void setMutuallyExclusiveWith(List<Module> mutuallyExclusiveWith) {
        this.mutuallyExclusiveWith = mutuallyExclusiveWith;
    }

    public List<String> getRequirements() {
        return requirements;
    }

    public void setRequirements(List<String> requirements) {
        this.requirements = requirements;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Module module = (Module) o;
        return Objects.equals(moduleId, module.moduleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(moduleId);
    }

    @Override
    public String toString() {
        return "Module{" +
                "id='" + moduleId + '\'' +
                ", name='" + name + '\'' +
                ", cu=" + courseUnit +
                ", planModuleGPAs=" + planModuleGPAs +
                ", planModulePreassignedGPAs=" + planModulePreassignedGPAs +
                ", preRequisites=" + preRequisites +
                ", preRequisiteDependents=" + preRequisiteDependents +
                ", coRequisites=" + coRequisites +
                ", corequisiteDependents=" + corequisiteDependents +
                ", mutuallyExclusives=" + mutuallyExclusives +
                ", mutuallyExclusiveWith=" + mutuallyExclusiveWith +
                ", requirements=" + requirements +
                '}';
    }
}
