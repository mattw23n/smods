package com.smods.backend.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "MAJOR")
public class Major {
    @Id
    @Column(name = "MAJOR_NAME")
    private String majorName;

    @Column(name = "FIRST_MAJOR?")
    private boolean firstMajor;

    @Column(name = "SECOND_MAJOR_SAME_SCHOOL?")
    private boolean secondMajorSameSchool;

    @Column(name = "SECOND_MAJOR_DIFFERENT_SCHOOL?")
    private boolean secondMajorDifferentSchool;

    @ManyToOne
    @JoinColumn(name = "DEGREE_NAME")
    private Degree degree;

    @ManyToMany
    @JoinTable(
            name = "ADDITIONAL_SECOND_MAJOR_MODULE_REQUIREMENT",
            joinColumns = @JoinColumn(name = "MAJOR_NAME"),
            inverseJoinColumns = @JoinColumn(name = "MODULE_ID")
    )
    private List<Module> additionalSecondMajorModuleRequirement;

    @ManyToMany
    @JoinTable(
            name = "TRACK_MODULE_REQUIREMENT",
            joinColumns = @JoinColumn(name = "MAJOR_NAME"),
            inverseJoinColumns = @JoinColumn(name = "MODULE_ID")
    )
    private List<Module> trackModuleRequirement;

    public Major() {
    }

    public Major(String majorName, boolean firstMajor, boolean secondMajorSameSchool, boolean secondMajorDifferentSchool, Degree degree) {
        this.majorName = majorName;
        this.firstMajor = firstMajor;
        this.secondMajorSameSchool = secondMajorSameSchool;
        this.secondMajorDifferentSchool = secondMajorDifferentSchool;
        this.degree = degree;
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

    public Degree getDegree() {
        return degree;
    }

    public void setDegree(Degree degree) {
        this.degree = degree;
    }

    public List<Module> getAdditionalSecondMajorModuleRequirement() {
        return additionalSecondMajorModuleRequirement;
    }

    public void setAdditionalSecondMajorModuleRequirement(List<Module> additionalSecondMajorModuleRequirement) {
        this.additionalSecondMajorModuleRequirement = additionalSecondMajorModuleRequirement;
    }

    public List<Module> getTrackModuleRequirement() {
        return trackModuleRequirement;
    }

    public void setTrackModuleRequirement(List<Module> trackModuleRequirement) {
        this.trackModuleRequirement = trackModuleRequirement;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Major major = (Major) o;
        return firstMajor == major.firstMajor && secondMajorSameSchool == major.secondMajorSameSchool && secondMajorDifferentSchool == major.secondMajorDifferentSchool && Objects.equals(majorName, major.majorName) && Objects.equals(degree, major.degree) && Objects.equals(additionalSecondMajorModuleRequirement, major.additionalSecondMajorModuleRequirement) && Objects.equals(trackModuleRequirement, major.trackModuleRequirement);
    }

    @Override
    public int hashCode() {
        return Objects.hash(majorName, firstMajor, secondMajorSameSchool, secondMajorDifferentSchool, degree, additionalSecondMajorModuleRequirement, trackModuleRequirement);
    }

    @Override
    public String toString() {
        return "Major{" +
                "majorName='" + majorName + '\'' +
                ", firstMajor=" + firstMajor +
                ", secondMajorSameSchool=" + secondMajorSameSchool +
                ", secondMajorDifferentSchool=" + secondMajorDifferentSchool +
                ", degree=" + degree +
                ", additionalSecondMajorModuleRequirement=" + additionalSecondMajorModuleRequirement +
                ", trackModuleRequirement=" + trackModuleRequirement +
                '}';
    }
}
