package com.smods.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "MAJOR")
public class Major {
    @Id
    @Column(name = "MAJOR_NAME")
    private String majorName;

    @Column(name = "FIRST_MAJOR?", nullable = false)
    private boolean firstMajor;

    @Column(name = "SECOND_MAJOR_SAME_SCHOOL?", nullable = false)
    private boolean secondMajorSameSchool;

    @Column(name = "SECOND_MAJOR_DIFFERENT_SCHOOL?", nullable = false)
    private boolean secondMajorDifferentSchool;

    @Column(name = "NUM_OF_SECOND_MAJOR_ELECTIVE", nullable = false)
    private Integer numOfSecondMajorElective;

    @Column(name = "NUM_OF_FIRST_MAJOR_ELECTIVE", nullable = false)
    private Integer numOfFirstMajorElective;

    @ManyToOne
    @JoinColumn(name = "DEGREE_NAME", nullable = false)
    @JsonBackReference
    private Degree degree;

    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<AdditionalSecondMajorModuleRequirement> additionalSecondMajorModuleRequirements;


    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<FirstMajorModuleRequirement> firstMajorModuleRequirements;

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

    public boolean isFirstMajor() {
        return firstMajor;
    }

    public void setFirstMajor(boolean firstMajor) {
        this.firstMajor = firstMajor;
    }

    public boolean isSecondMajorSameSchool() {
        return secondMajorSameSchool;
    }

    public void setSecondMajorSameSchool(boolean secondMajorSameSchool) {
        this.secondMajorSameSchool = secondMajorSameSchool;
    }

    public boolean isSecondMajorDifferentSchool() {
        return secondMajorDifferentSchool;
    }

    public void setSecondMajorDifferentSchool(boolean secondMajorDifferentSchool) {
        this.secondMajorDifferentSchool = secondMajorDifferentSchool;
    }

    public Integer getNumOfSecondMajorElective() {
        return numOfSecondMajorElective;
    }

    public void setNumOfSecondMajorElective(Integer numOfSecondMajorElective) {
        this.numOfSecondMajorElective = numOfSecondMajorElective;
    }

    public Integer getNumOfFirstMajorElective() {
        return numOfFirstMajorElective;
    }

    public void setNumOfFirstMajorElective(Integer numOfFirstMajorElective) {
        this.numOfFirstMajorElective = numOfFirstMajorElective;
    }

    public Degree getDegree() {
        return degree;
    }

    public void setDegree(Degree degree) {
        this.degree = degree;
    }

    public List<AdditionalSecondMajorModuleRequirement> getAdditionalSecondMajorModuleRequirements() {
        return additionalSecondMajorModuleRequirements;
    }

    public void setAdditionalSecondMajorModuleRequirements(List<AdditionalSecondMajorModuleRequirement> additionalSecondMajorModuleRequirements) {
        this.additionalSecondMajorModuleRequirements = additionalSecondMajorModuleRequirements;
    }

    public List<FirstMajorModuleRequirement> getFirstMajorModuleRequirements() {
        return firstMajorModuleRequirements;
    }

    public void setFirstMajorModuleRequirements(List<FirstMajorModuleRequirement> firstMajorModuleRequirements) {
        this.firstMajorModuleRequirements = firstMajorModuleRequirements;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Major major = (Major) o;
        return firstMajor == major.firstMajor && secondMajorSameSchool == major.secondMajorSameSchool && secondMajorDifferentSchool == major.secondMajorDifferentSchool && numOfSecondMajorElective == major.numOfSecondMajorElective && numOfFirstMajorElective == major.numOfFirstMajorElective && Objects.equals(majorName, major.majorName) && Objects.equals(degree, major.degree) && Objects.equals(additionalSecondMajorModuleRequirements, major.additionalSecondMajorModuleRequirements) && Objects.equals(firstMajorModuleRequirements, major.firstMajorModuleRequirements);
    }

    @Override
    public int hashCode() {
        return Objects.hash(majorName, firstMajor, secondMajorSameSchool, secondMajorDifferentSchool, numOfSecondMajorElective, numOfFirstMajorElective, degree, additionalSecondMajorModuleRequirements, firstMajorModuleRequirements);
    }

    @Override
    public String toString() {
        return "Major{" +
                "majorName='" + majorName + '\'' +
                ", firstMajor=" + firstMajor +
                ", secondMajorSameSchool=" + secondMajorSameSchool +
                ", secondMajorDifferentSchool=" + secondMajorDifferentSchool +
                ", numOfSecondMajorElective=" + numOfSecondMajorElective +
                ", numOfFirstMajorElective=" + numOfFirstMajorElective +
                ", degree=" + degree +
                ", additionalSecondMajorModuleRequirements=" + additionalSecondMajorModuleRequirements +
                ", firstMajorModuleRequirements=" + firstMajorModuleRequirements +
                '}';
    }
}
