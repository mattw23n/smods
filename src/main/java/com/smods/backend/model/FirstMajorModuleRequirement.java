package com.smods.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.smods.backend.model.composite_key.MajorModuleKey;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "FIRST_MAJOR_MODULE_REQUIREMENT")
public class FirstMajorModuleRequirement {
    @EmbeddedId
    private MajorModuleKey firstMajorModuleRequirementId;

    @Column(name = "IS_COMPULSORY?", nullable = false)
    private boolean isCompulsory;

    @ManyToOne
    @JoinColumn(name = "MAJOR_NAME")
    @MapsId("majorName")
    @JsonBackReference
    private Major major;

    @ManyToOne
    @JoinColumn(name = "MODULE_ID")
    @MapsId("moduleId")
    private Module module;

    public FirstMajorModuleRequirement() {
    }

    public FirstMajorModuleRequirement(MajorModuleKey firstMajorModuleRequirementId, boolean isCompulsory) {
        this.firstMajorModuleRequirementId = firstMajorModuleRequirementId;
        this.isCompulsory = isCompulsory;
    }

    public MajorModuleKey getFirstMajorModuleRequirementId() {
        return firstMajorModuleRequirementId;
    }

    public void setFirstMajorModuleRequirementId(MajorModuleKey firstMajorModuleRequirementId) {
        this.firstMajorModuleRequirementId = firstMajorModuleRequirementId;
    }

    public boolean isCompulsory() {
        return isCompulsory;
    }

    public void setCompulsory(boolean compulsory) {
        isCompulsory = compulsory;
    }

    public Major getMajor() {
        return major;
    }

    public void setMajor(Major major) {
        this.major = major;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FirstMajorModuleRequirement that = (FirstMajorModuleRequirement) o;
        return isCompulsory == that.isCompulsory && Objects.equals(firstMajorModuleRequirementId, that.firstMajorModuleRequirementId) && Objects.equals(major, that.major) && Objects.equals(module, that.module);
    }

    @Override
    public int hashCode() {
        return Objects.hash(firstMajorModuleRequirementId, isCompulsory, major, module);
    }

    @Override
    public String toString() {
        return "TrackModuleRequirement{" +
                "firstMajorModuleRequirementId=" + firstMajorModuleRequirementId +
                ", isCompulsory=" + isCompulsory +
                ", major=" + major.getMajorName() +
                ", module=" + module.getModuleId() +
                '}';
    }
}
