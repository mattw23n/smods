package com.smods.backend.model.composite_key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PlanModuleGPAKey implements Serializable {
    private PlanKey planKey;

    @Column(name = "MODULE_ID", nullable = false)
    private String moduleId;

    public PlanModuleGPAKey() {
    }

    public PlanModuleGPAKey(PlanKey planKey, String moduleId) {
        this.planKey = planKey;
        this.moduleId = moduleId;
    }

    public PlanKey getPlanKey() {
        return planKey;
    }

    public void setPlanKey(PlanKey planKey) {
        this.planKey = planKey;
    }

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlanModuleGPAKey that = (PlanModuleGPAKey) o;
        return Objects.equals(planKey, that.planKey) && Objects.equals(moduleId, that.moduleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(planKey, moduleId);
    }

    @Override
    public String toString() {
        return "PlanModuleGPAKey{" +
                "planKey=" + planKey +
                ", moduleId='" + moduleId + '\'' +
                '}';
    }
}