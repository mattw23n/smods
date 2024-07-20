package com.smods.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.smods.backend.model.composite_key.MajorModuleKey;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "ADDITIONAL_SECOND_MAJOR_MODULE_REQUIREMENT")
public class AdditionalSecondMajorModuleRequirement {
    @EmbeddedId
    private MajorModuleKey additionalSecondMajorModuleRequirementId;

    @Column(name = "IS_COMPULSORY?")
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

    public AdditionalSecondMajorModuleRequirement() {
    }

    public AdditionalSecondMajorModuleRequirement(MajorModuleKey additionalSecondMajorModuleRequirementId, boolean isCompulsory) {
        this.additionalSecondMajorModuleRequirementId = additionalSecondMajorModuleRequirementId;
        this.isCompulsory = isCompulsory;
    }

    public MajorModuleKey getAdditionalSecondMajorModuleRequirementId() {
        return additionalSecondMajorModuleRequirementId;
    }

    public void setAdditionalSecondMajorModuleRequirementId(MajorModuleKey additionalSecondMajorModuleRequirementId) {
        this.additionalSecondMajorModuleRequirementId = additionalSecondMajorModuleRequirementId;
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
        AdditionalSecondMajorModuleRequirement that = (AdditionalSecondMajorModuleRequirement) o;
        return isCompulsory == that.isCompulsory && Objects.equals(additionalSecondMajorModuleRequirementId, that.additionalSecondMajorModuleRequirementId) && Objects.equals(major, that.major) && Objects.equals(module, that.module);
    }

    @Override
    public int hashCode() {
        return Objects.hash(additionalSecondMajorModuleRequirementId, isCompulsory, major, module);
    }

    @Override
    public String toString() {
        return "AdditionalSecondMajorModuleRequirement{" +
                "additionalSecondMajorModuleRequirementId=" + additionalSecondMajorModuleRequirementId +
                ", isCompulsory=" + isCompulsory +
                ", major=" + major +
                ", module=" + module +
                '}';
    }
}
