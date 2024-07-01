package com.smods.backend.model;

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
    private List<PlanModuleGPA> planModuleGPAs;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    private List<PlanModulePreassignedGPA> planModulePreassignedGPAs;

    @ManyToMany
    @JoinTable(
            name = "PRE_REQUISITE",
            joinColumns = @JoinColumn(name = "MID"),
            inverseJoinColumns = @JoinColumn(name = "MID2")
    )
    private List<Module> prerequisites;

    @ManyToMany(mappedBy = "prerequisites")
    private List<Module> prerequisiteDependents;

    @ManyToMany
    @JoinTable(
            name = "CO_REQUISITE",
            joinColumns = @JoinColumn(name = "MID"),
            inverseJoinColumns = @JoinColumn(name = "MID2")
    )
    private List<Module> corequisites;

    @ManyToMany(mappedBy = "corequisites")
    private List<Module> corequisiteDependents;

    @ManyToMany
    @JoinTable(
            name = "MUTUALLY_EXCLUSIVE",
            joinColumns = @JoinColumn(name = "MID"),
            inverseJoinColumns = @JoinColumn(name = "MID2")
    )
    private List<Module> mutuallyExclusives;

    @ManyToMany(mappedBy = "mutuallyExclusives")
    private List<Module> mutuallyExclusiveWith;

    @ElementCollection
    @CollectionTable(name = "GRAD_REQUIREMENT", joinColumns = @JoinColumn(name = "MID"))
    @Column(name = "requirement")
    private List<String> requirements;

    // Default constructor
    public Module() {}

    // Constructor
    public Module(String id, String name, Float cu) {
        this.id = id;
        this.name = name;
        this.cu = cu;
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

    public List<Module> getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(List<Module> prerequisites) {
        this.prerequisites = prerequisites;
    }

    public List<Module> getPrerequisiteDependents() {
        return prerequisiteDependents;
    }

    public void setPrerequisiteDependents(List<Module> prerequisiteDependents) {
        this.prerequisiteDependents = prerequisiteDependents;
    }

    public List<Module> getCorequisites() {
        return corequisites;
    }

    public void setCorequisites(List<Module> corequisites) {
        this.corequisites = corequisites;
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
        return Objects.equals(id, module.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Module{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", cu=" + cu +
                ", planModuleGPAs=" + planModuleGPAs +
                ", planModulePreassignedGPAs=" + planModulePreassignedGPAs +
                ", prerequisites=" + prerequisites +
                ", prerequisiteDependents=" + prerequisiteDependents +
                ", corequisites=" + corequisites +
                ", corequisiteDependents=" + corequisiteDependents +
                ", mutuallyExclusives=" + mutuallyExclusives +
                ", mutuallyExclusiveWith=" + mutuallyExclusiveWith +
                ", requirements=" + requirements +
                '}';
    }
}
