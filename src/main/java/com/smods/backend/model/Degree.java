package com.smods.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;

import java.util.Map;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "DEGREE")
public class Degree {
    @Id
    @Column(name = "DEGREE_NAME")
    private String degreeName;

    @ElementCollection
    @CollectionTable(name = "GRAD_REQUIREMENT", joinColumns = @JoinColumn(name = "DEGREE_NAME"))
    @MapKeyColumn(name = "REQUIREMENT_TYPE")
    @Column(name = "COURSE_UNIT")
    private Map<String, Double> gradRequirement;

    @OneToMany(mappedBy = "degree", cascade = CascadeType.ALL)
    private List<Major> majors;

    @OneToMany(mappedBy = "degree", cascade = CascadeType.ALL)
    private List<MajorModuleRequirement> majorModuleRequirements;

    public Degree() {
    }

    public Degree(String degreeName, List<Major> majors) {
        this.degreeName = degreeName;
        this.majors = majors;
    }

    public String getDegreeName() {
        return degreeName;
    }

    public void setDegreeName(String degreeName) {
        this.degreeName = degreeName;
    }

    public Map<String, Double> getGradRequirement() {
        return gradRequirement;
    }

    public void setGradRequirement(Map<String, Double> gradRequirement) {
        this.gradRequirement = gradRequirement;
    }

    public List<Major> getMajors() {
        return majors;
    }

    public void setMajors(List<Major> majors) {
        this.majors = majors;
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
        Degree degree = (Degree) o;
        return Objects.equals(degreeName, degree.degreeName) && Objects.equals(gradRequirement, degree.gradRequirement) && Objects.equals(majors, degree.majors) && Objects.equals(majorModuleRequirements, degree.majorModuleRequirements);
    }

    @Override
    public int hashCode() {
        return Objects.hash(degreeName, gradRequirement, majors, majorModuleRequirements);
    }

    @Override
    public String toString() {
        return "Degree{" +
                "degreeName='" + degreeName + '\'' +
                ", gradRequirement=" + gradRequirement +
                ", majors=" + majors +
                ", majorModuleRequirements=" + majorModuleRequirements +
                '}';
    }
}
