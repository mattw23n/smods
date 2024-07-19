package com.smods.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;

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
    private Double courseUnit;

    @ElementCollection
    @CollectionTable(name = "BASKET", joinColumns = @JoinColumn(name = "MODULE_ID"))
    @Column(name = "BASKET")
    private List<String> baskets;

    @Column(name = "SUBTYPE")
    private String subtype;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    @JsonBackReference(value = "module-planModuleGPA")
    private  List<PlanModuleGPA> planModuleGPAs;

    @ManyToMany
    @JoinTable(
            name = "PRE_REQUISITE",
            joinColumns = @JoinColumn(name = "MODULE_ID"),
            inverseJoinColumns = @JoinColumn(name = "PRE_REQUISITE_MODULE_ID")
    )
    @JsonBackReference(value = "preRequisites")
    List<Module> preRequisites;

    @ManyToMany
    @JoinTable(
            name = "CO_REQUISITE",
            joinColumns = @JoinColumn(name = "MODULE_ID"),
            inverseJoinColumns = @JoinColumn(name = "CO_REQUISITE_MODULE_ID")
    )
    @JsonBackReference(value = "coRequisites")
    private List<Module> coRequisites;

    @ManyToMany
    @JoinTable(
            name = "MUTUALLY_EXCLUSIVE",
            joinColumns = @JoinColumn(name = "MODULE_ID"),
            inverseJoinColumns = @JoinColumn(name = "MUTUALLY_EXCLUSIVE_MODULE_ID")
    )
    @JsonBackReference(value = "mutuallyExclusives")
    private List<Module> mutuallyExclusives;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    private List<MajorModuleRequirement> majorModuleRequirements;

    public Module() {
    }

    public Module(String moduleId, String moduleName, Double courseUnit, List<String> baskets, String subtype) {
        this.moduleId = moduleId;
        this.moduleName = moduleName;
        this.courseUnit = courseUnit;
        this.baskets = baskets;
        this.subtype = subtype;
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

    public Double getCourseUnit() {
        return courseUnit;
    }

    public void setCourseUnit(Double courseUnit) {
        this.courseUnit = courseUnit;
    }

    public List<String> getBaskets() {
        return baskets;
    }

    public void setBaskets(List<String> baskets) {
        this.baskets = baskets;
    }

    public String getSubtype() {
        return subtype;
    }

    public void setSubtype(String subtype) {
        this.subtype = subtype;
    }

    public List<PlanModuleGPA> getPlanModuleGPAs() {
        return planModuleGPAs;
    }

    public void setPlanModuleGPAs(List<PlanModuleGPA> planModuleGPAs) {
        this.planModuleGPAs = planModuleGPAs;
    }

    public List<Module> getPreRequisites() {
        return preRequisites;
    }

    public void setPreRequisites(List<Module> preRequisites) {
        this.preRequisites = preRequisites;
    }

    public List<Module> getCoRequisites() {
        return coRequisites;
    }

    public void setCoRequisites(List<Module> coRequisites) {
        this.coRequisites = coRequisites;
    }

    public List<Module> getMutuallyExclusives() {
        return mutuallyExclusives;
    }

    public void setMutuallyExclusives(List<Module> mutuallyExclusives) {
        this.mutuallyExclusives = mutuallyExclusives;
    }

    public List<MajorModuleRequirement> getMajorModuleRequirements() {
        return majorModuleRequirements;
    }

    public void setMajorModuleRequirements(List<MajorModuleRequirement> majorModuleRequirements) {
        this.majorModuleRequirements = majorModuleRequirements;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Module module = (Module) o;
        return Objects.equals(moduleId, module.moduleId) && Objects.equals(moduleName, module.moduleName) && Objects.equals(courseUnit, module.courseUnit) && Objects.equals(baskets, module.baskets) && Objects.equals(subtype, module.subtype) && Objects.equals(planModuleGPAs, module.planModuleGPAs) && Objects.equals(preRequisites, module.preRequisites) && Objects.equals(coRequisites, module.coRequisites) && Objects.equals(mutuallyExclusives, module.mutuallyExclusives) && Objects.equals(majorModuleRequirements, module.majorModuleRequirements);
    }

    @Override
    public int hashCode() {
        return Objects.hash(moduleId, moduleName, courseUnit, baskets, subtype, planModuleGPAs, preRequisites, coRequisites, mutuallyExclusives, majorModuleRequirements);
    }

    @Override
    public String toString() {
        return "Module{" +
                "moduleId='" + moduleId + '\'' +
                ", moduleName='" + moduleName + '\'' +
                ", courseUnit=" + courseUnit +
                ", baskets=" + baskets +
                ", subtype='" + subtype + '\'' +
                ", planModuleGPAs=" + planModuleGPAs +
                ", preRequisites=" + preRequisites +
                ", coRequisites=" + coRequisites +
                ", mutuallyExclusives=" + mutuallyExclusives +
                ", majorModuleRequirements=" + majorModuleRequirements +
                '}';
    }
}
