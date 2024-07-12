package com.smods.backend.model.composite_key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PreassignedModuleKey implements Serializable {
    private PlanKey planId;

    @Column(name = "MODULE_ID")
    private String moduleId;

    @Column(name = "MAJOR_NAME")
    private String majorName;

    // Default constructor
    public PreassignedModuleKey() {}

    // Constructor with parameters


    public PreassignedModuleKey(PlanKey planId, String moduleId, String majorName) {
        this.planId = planId;
        this.moduleId = moduleId;
        this.majorName = majorName;
    }

    public PlanKey getPlanId() {
        return planId;
    }

    public void setPlanId(PlanKey planId) {
        this.planId = planId;
    }

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getMajorName() {
        return majorName;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PreassignedModuleKey that = (PreassignedModuleKey) o;
        return Objects.equals(planId, that.planId) && Objects.equals(moduleId, that.moduleId) && Objects.equals(majorName, that.majorName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(planId, moduleId, majorName);
    }

    @Override
    public String toString() {
        return "PreassignedModuleKey{" +
                "planId=" + planId +
                ", moduleId='" + moduleId + '\'' +
                ", majorName='" + majorName + '\'' +
                '}';
    }
}