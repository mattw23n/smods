package com.smods.backend.model.composite_key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PlanModulePreassignedGPAKey implements Serializable {
    private PlanKey planId;

    @Column(name = "MODULE_ID")
    private String moduleId;

    // Default constructor
    public PlanModulePreassignedGPAKey() {}

    // Constructor with parameters

    public PlanModulePreassignedGPAKey(PlanKey planId, String moduleId) {
        this.planId = planId;
        this.moduleId = moduleId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlanModulePreassignedGPAKey that = (PlanModulePreassignedGPAKey) o;
        return Objects.equals(planId, that.planId) && Objects.equals(moduleId, that.moduleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(planId, moduleId);
    }
}
