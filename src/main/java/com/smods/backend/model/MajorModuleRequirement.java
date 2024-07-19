package com.smods.backend.model;

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

    @Column(name = "IS_SMU_CORE?")
    private boolean isSMUCore;

    @ManyToOne
    @MapsId("moduleId")
    @JoinColumn(name = "MODULE_ID")
    private Module module;

    @ManyToOne
    @MapsId("degreeName")
    @JoinColumn(name = "DEGREE_NAME")
    private Degree degree;

    public MajorModuleRequirement() {
    }

    public MajorModuleRequirement(MajorModuleRequirementKey majorModuleRequirementId, boolean isMajorCore, boolean isSMUCore) {
        this.majorModuleRequirementId = majorModuleRequirementId;
        this.isMajorCore = isMajorCore;
        this.isSMUCore = isSMUCore;
    }

    public MajorModuleRequirementKey getMajorModuleRequirementId() {
        return majorModuleRequirementId;
    }

    public void setMajorModuleRequirementId(MajorModuleRequirementKey majorModuleRequirementId) {
        this.majorModuleRequirementId = majorModuleRequirementId;
    }

    public boolean isMajorCore() {
        return isMajorCore;
    }

    public void setMajorCore(boolean majorCore) {
        isMajorCore = majorCore;
    }

    public boolean isSMUCore() {
        return isSMUCore;
    }

    public void setSMUCore(boolean SMUCore) {
        isSMUCore = SMUCore;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public Degree getDegree() {
        return degree;
    }

    public void setDegree(Degree degree) {
        this.degree = degree;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MajorModuleRequirement that = (MajorModuleRequirement) o;
        return isMajorCore == that.isMajorCore && isSMUCore == that.isSMUCore && Objects.equals(majorModuleRequirementId, that.majorModuleRequirementId) && Objects.equals(module, that.module) && Objects.equals(degree, that.degree);
    }

    @Override
    public int hashCode() {
        return Objects.hash(majorModuleRequirementId, isMajorCore, isSMUCore, module, degree);
    }

    @Override
    public String toString() {
        return "MajorModuleRequirement{" +
                "majorModuleRequirementId=" + majorModuleRequirementId +
                ", isMajorCore=" + isMajorCore +
                ", isSMUCore=" + isSMUCore +
                ", module=" + module +
                ", degree=" + degree +
                '}';
    }
}
