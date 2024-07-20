package com.smods.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.hibernate.annotations.Cascade;
import org.springframework.boot.autoconfigure.task.TaskExecutionProperties;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.AbstractMap.SimpleEntry;
@Entity
@Table(name = "MODULE")
public class Module {

    @Id
    @Column(name = "MODULE_ID")
    private String moduleId;

    @Column(name = "MODULE_NAME", nullable = false)
    private String moduleName;

    @Column(name = "COURSE_UNIT", nullable = false)
    private Double courseUnit;

    public static final String[][] hierarchy = {
            {"Major Core", "Major Elective", "Free Elective"},
            {"Uni Core", "Free Elective"}
    };

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    @JsonBackReference(value = "module-planModuleGPA")
    private  List<PlanModuleGPA> planModuleGPAs;

    @ManyToMany
    @JoinTable(
            name = "PRE_REQUISITE",
            joinColumns = @JoinColumn(name = "MODULE_ID", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "PRE_REQUISITE_MODULE_ID", nullable = false)
    )
    @JsonBackReference(value = "preRequisites")
    List<Module> preRequisites;

    @ManyToMany
    @JoinTable(
            name = "CO_REQUISITE",
            joinColumns = @JoinColumn(name = "MODULE_ID", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "CO_REQUISITE_MODULE_ID", nullable = false)
    )
    @JsonBackReference(value = "coRequisites")
    private List<Module> coRequisites;

    @ManyToMany
    @JoinTable(
            name = "MUTUALLY_EXCLUSIVE",
            joinColumns = @JoinColumn(name = "MODULE_ID", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "MUTUALLY_EXCLUSIVE_MODULE_ID", nullable = false)
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
    }

    public static String getLowerHierarchy(String currentHierarchy){
        if (currentHierarchy.equals("Free Elective")){
            throw new RuntimeException("You are already at the bottom of the hierarchy");
        }

        SimpleEntry<Integer, Integer> position = findHierarchyPosition(currentHierarchy, new SimpleEntry<>(0, 0));
        while (hierarchy[position.getKey()].length - 1 == position.getValue()){
            position = findHierarchyPosition(currentHierarchy, position);
        }

        return position.getValue() == 0 ? hierarchy[position.getKey()][position.getValue()] : hierarchy[position.getKey()][position.getValue() + 1];

    }

    private static SimpleEntry<Integer, Integer> findHierarchyPosition(String currentHierarchy, SimpleEntry<Integer, Integer> position){
        if (position.getKey() >= hierarchy.length || position.getValue() >= hierarchy[position.getKey()].length){
            throw new RuntimeException("Invalid position");
        }

        for (int i = position.getKey(); i < hierarchy.length; i++){
            for (int j = position.getValue() + 1; j < hierarchy[i].length; j++){
                if (hierarchy[i][j].equals(currentHierarchy)){
                    return new SimpleEntry<>(i, j);
                }
            }
        }

        throw new RuntimeException("Graduation requirement not found");
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
        return Objects.equals(moduleId, module.moduleId) && Objects.equals(moduleName, module.moduleName) && Objects.equals(courseUnit, module.courseUnit) && Objects.equals(planModuleGPAs, module.planModuleGPAs) && Objects.equals(preRequisites, module.preRequisites) && Objects.equals(coRequisites, module.coRequisites) && Objects.equals(mutuallyExclusives, module.mutuallyExclusives) && Objects.equals(majorModuleRequirements, module.majorModuleRequirements);
    }

    @Override
    public int hashCode() {
        return Objects.hash(moduleId, moduleName, courseUnit, planModuleGPAs, preRequisites, coRequisites, mutuallyExclusives, majorModuleRequirements);
    }

    @Override
    public String toString() {
        return "Module{" +
                "moduleId='" + moduleId + '\'' +
                ", moduleName='" + moduleName + '\'' +
                ", courseUnit=" + courseUnit +
                ", planModuleGPAs=" + planModuleGPAs +
                ", preRequisites=" + preRequisites +
                ", coRequisites=" + coRequisites +
                ", mutuallyExclusives=" + mutuallyExclusives +
                ", majorModuleRequirements=" + majorModuleRequirements +
                '}';
    }
}
