package com.smods.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.smods.backend.model.composite_key.MajorModuleRequirementKey;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "MAJOR_MODULE_REQUIREMENT")
public class MajorModuleRequirement {
    @EmbeddedId
    private  MajorModuleRequirementKey majorModuleRequirementId;

    @Column(name = "IS_MAJOR_CORE?")
    private boolean isMajorCore;

    @ManyToOne
    @MapsId("moduleId")
    @JoinColumn(name = "MODULE_ID")
    @JsonBackReference
    private Module module;

    @ManyToOne
    @MapsId("degreeName")
    @JoinColumn(name = "DEGREE_NAME")
    @JsonBackReference
    private Degree degree;

    public MajorModuleRequirement() {
    }

    public MajorModuleRequirement(MajorModuleRequirementKey majorModuleRequirementId, boolean isMajorCore) {
        this.majorModuleRequirementId = majorModuleRequirementId;
        this.isMajorCore = isMajorCore;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MajorModuleRequirement that = (MajorModuleRequirement) o;
        return isMajorCore == that.isMajorCore && Objects.equals(majorModuleRequirementId, that.majorModuleRequirementId) && Objects.equals(module, that.module) && Objects.equals(degree, that.degree);
    }

    @Override
    public int hashCode() {
        return Objects.hash(majorModuleRequirementId, isMajorCore, module, degree);
    }

    @Override
    public String toString() {
        return "MajorModuleRequirement{" +
                "majorModuleRequirementId=" + majorModuleRequirementId +
                ", isMajorCore=" + isMajorCore +
                ", module=" + module +
                ", degree=" + degree +
                '}';
    }
}
