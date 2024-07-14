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
    private String moduleName;

    @Column(name = "COURSE_UNIT")
    private Float courseUnit;

    @Column(name = "TRACK_NAME")
    private String trackName;

    @Column(name = "GRAD_REQUIREMENT")
    private String gradRequirement;

<<<<<<< HEAD
    @Column(name = "BASKET")
    private String basket;
=======
    @Column(name = "GRAD_SUBREQUIREMENT")
    private String gradSubrequirement;
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581


    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    @JsonBackReference(value = "module-planModuleGPA")
    private List<PlanModuleGPA> planModuleGPAs;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    @JsonBackReference(value = "module-planModulePreassignedGPA")
    private List<PreassignedModule> preassignedModules;

    @ManyToMany
    @JoinTable(
            name = "PRE_REQUISITE",
            joinColumns = @JoinColumn(name = "MODULE_ID"),
            inverseJoinColumns = @JoinColumn(name = "MODULE_ID2")
    )
    private List<Module> preRequisites;

    @ManyToMany(mappedBy = "preRequisites")
    @JsonBackReference(value = "preRequisiteDependents")
    private List<Module> preRequisiteDependents;

    @ManyToMany
    @JoinTable(
            name = "CO_REQUISITE",
            joinColumns = @JoinColumn(name = "MODULE_ID"),
            inverseJoinColumns = @JoinColumn(name = "MODULE_ID2")
    )
    private List<Module> coRequisites;

    @ManyToMany(mappedBy = "coRequisites")
    @JsonBackReference(value = "coRequisiteDependents")
    private List<Module> coRequisiteDependents;

    @ManyToMany
    @JoinTable(
            name = "MUTUALLY_EXCLUSIVE",
            joinColumns = @JoinColumn(name = "MODULE_ID"),
            inverseJoinColumns = @JoinColumn(name = "MODULE_ID2")
    )
    private List<Module> mutuallyExclusives;

    @ManyToMany(mappedBy = "mutuallyExclusives")
    @JsonBackReference(value = "mutuallyExclusiveWith")
    private List<Module> mutuallyExclusiveWith;

<<<<<<< HEAD
    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    private List<MajorModule> majormodules;
    // Default constructor
    public Module() {}

    public Module(String moduleId, String moduleName, Float courseUnit, String gradRequirement, String basket) {
=======
    @ManyToOne
    @JoinColumn(name = "MAJOR_NAME")
    private Major major;
    // Default constructor
    public Module() {}

    public Module(String moduleId, String moduleName, Float courseUnit, String gradRequirement, String gradSubrequirement) {
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
        this.moduleId = moduleId;
        this.moduleName = moduleName;
        this.courseUnit = courseUnit;
        this.gradRequirement = gradRequirement;
<<<<<<< HEAD
        this.basket = basket;
=======
        this.gradSubrequirement = gradSubrequirement;
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    }

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public Float getCourseUnit() {
        return courseUnit;
    }

    public void setCourseUnit(Float courseUnit) {
        this.courseUnit = courseUnit;
    }

<<<<<<< HEAD
    public String getTrackName() {
        return trackName;
    }

    public void setTrackName(String trackName) {
        this.trackName = trackName;
    }

=======
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    public String getGradRequirement() {
        return gradRequirement;
    }

    public void setGradRequirement(String gradRequirement) {
        this.gradRequirement = gradRequirement;
    }

<<<<<<< HEAD
    public String getBasket() {
        return basket;
    }

    public void setBasket(String basket) {
        this.basket = basket;
=======
    public String getGradSubrequirement() {
        return gradSubrequirement;
    }

    public void setGradSubrequirement(String gradSubrequirement) {
        this.gradSubrequirement = gradSubrequirement;
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    }

    public List<PlanModuleGPA> getPlanModuleGPAs() {
        return planModuleGPAs;
    }

    public void setPlanModuleGPAs(List<PlanModuleGPA> planModuleGPAs) {
        this.planModuleGPAs = planModuleGPAs;
    }

<<<<<<< HEAD
    public List<PreassignedModule> getPreassignedModules() {
        return preassignedModules;
    }

    public void setPreassignedModules(List<PreassignedModule> preassignedModules) {
=======
    public List<PreassignedModule> getPlanModulePreassignedGPAs() {
        return preassignedModules;
    }

    public void setPlanModulePreassignedGPAs(List<PreassignedModule> preassignedModules) {
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
        this.preassignedModules = preassignedModules;
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

    public List<Module> getCoRequisites() {
        return coRequisites;
    }

    public void setCoRequisites(List<Module> coRequisites) {
        this.coRequisites = coRequisites;
    }

    public List<Module> getCoRequisiteDependents() {
        return coRequisiteDependents;
    }

    public void setCoRequisiteDependents(List<Module> coRequisiteDependents) {
        this.coRequisiteDependents = coRequisiteDependents;
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

<<<<<<< HEAD
    public List<MajorModule> getMajormodules() {
        return majormodules;
    }

    public void setMajormodules(List<MajorModule> majormodules) {
        this.majormodules = majormodules;
=======
    public Major getMajor() {
        return major;
    }

    public void setMajor(Major major) {
        this.major = major;
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Module module = (Module) o;
<<<<<<< HEAD
        return Objects.equals(moduleId, module.moduleId) && Objects.equals(moduleName, module.moduleName) && Objects.equals(courseUnit, module.courseUnit) && Objects.equals(trackName, module.trackName) && Objects.equals(gradRequirement, module.gradRequirement) && Objects.equals(basket, module.basket) && Objects.equals(planModuleGPAs, module.planModuleGPAs) && Objects.equals(preassignedModules, module.preassignedModules) && Objects.equals(preRequisites, module.preRequisites) && Objects.equals(preRequisiteDependents, module.preRequisiteDependents) && Objects.equals(coRequisites, module.coRequisites) && Objects.equals(coRequisiteDependents, module.coRequisiteDependents) && Objects.equals(mutuallyExclusives, module.mutuallyExclusives) && Objects.equals(mutuallyExclusiveWith, module.mutuallyExclusiveWith) && Objects.equals(majormodules, module.majormodules);
=======
        return Objects.equals(moduleId, module.moduleId) && Objects.equals(moduleName, module.moduleName) && Objects.equals(courseUnit, module.courseUnit) && Objects.equals(gradRequirement, module.gradRequirement) && Objects.equals(gradSubrequirement, module.gradSubrequirement) && Objects.equals(planModuleGPAs, module.planModuleGPAs) && Objects.equals(preassignedModules, module.preassignedModules) && Objects.equals(preRequisites, module.preRequisites) && Objects.equals(preRequisiteDependents, module.preRequisiteDependents) && Objects.equals(coRequisites, module.coRequisites) && Objects.equals(coRequisiteDependents, module.coRequisiteDependents) && Objects.equals(mutuallyExclusives, module.mutuallyExclusives) && Objects.equals(mutuallyExclusiveWith, module.mutuallyExclusiveWith) && Objects.equals(major, module.major);
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    }

    @Override
    public int hashCode() {
<<<<<<< HEAD
        return Objects.hash(moduleId, moduleName, courseUnit, trackName, gradRequirement, basket, planModuleGPAs, preassignedModules, preRequisites, preRequisiteDependents, coRequisites, coRequisiteDependents, mutuallyExclusives, mutuallyExclusiveWith, majormodules);
=======
        return Objects.hash(moduleId, moduleName, courseUnit, gradRequirement, gradSubrequirement, planModuleGPAs, preassignedModules, preRequisites, preRequisiteDependents, coRequisites, coRequisiteDependents, mutuallyExclusives, mutuallyExclusiveWith, major);
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    }

    @Override
    public String toString() {
        return "Module{" +
                "moduleId='" + moduleId + '\'' +
                ", moduleName='" + moduleName + '\'' +
                ", courseUnit=" + courseUnit +
<<<<<<< HEAD
                ", trackName='" + trackName + '\'' +
                ", gradRequirement='" + gradRequirement + '\'' +
                ", basket='" + basket + '\'' +
                ", planModuleGPAs=" + planModuleGPAs +
                ", preassignedModules=" + preassignedModules +
=======
                ", gradRequirement='" + gradRequirement + '\'' +
                ", gradSubrequirement='" + gradSubrequirement + '\'' +
                ", planModuleGPAs=" + planModuleGPAs +
                ", planModulePreassignedGPAs=" + preassignedModules +
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
                ", preRequisites=" + preRequisites +
                ", preRequisiteDependents=" + preRequisiteDependents +
                ", coRequisites=" + coRequisites +
                ", coRequisiteDependents=" + coRequisiteDependents +
                ", mutuallyExclusives=" + mutuallyExclusives +
                ", mutuallyExclusiveWith=" + mutuallyExclusiveWith +
<<<<<<< HEAD
                ", majormodules=" + majormodules +
=======
                ", major=" + major +
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
                '}';
    }
}
