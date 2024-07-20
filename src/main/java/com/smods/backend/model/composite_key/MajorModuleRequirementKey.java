package com.smods.backend.model.composite_key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class MajorModuleRequirementKey implements Serializable {
    @Column(name = "DEGREE_NAME", nullable = false)
    private String degreeName;

    @Column(name = "MODULE_ID", nullable = false)
    private String moduleId;

    public MajorModuleRequirementKey() {
    }

    public MajorModuleRequirementKey(String degreeName, String moduleId) {
        this.degreeName = degreeName;
        this.moduleId = moduleId;
    }

    public String getDegreeName() {
        return degreeName;
    }

    public void setDegreeName(String degreeName) {
        this.degreeName = degreeName;
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
        MajorModuleRequirementKey that = (MajorModuleRequirementKey) o;
        return Objects.equals(degreeName, that.degreeName) && Objects.equals(moduleId, that.moduleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(degreeName, moduleId);
    }

    @Override
    public String toString() {
        return "MajorModuleRequirementKey{" +
                "degreeName='" + degreeName + '\'' +
                ", moduleId='" + moduleId + '\'' +
                '}';
    }
}
