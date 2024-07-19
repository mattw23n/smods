package com.smods.backend.model.composite_key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class MajorModuleKey implements Serializable {
    @Column(name = "MAJOR_NAME")
    private String majorName;

    @Column(name = "MODULE_ID")
    private String moduleId;

    public MajorModuleKey() {
    }

    public MajorModuleKey(String majorName, String moduleId) {
        this.majorName = majorName;
        this.moduleId = moduleId;
    }

    public String getMajorName() {
        return majorName;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName;
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
        MajorModuleKey that = (MajorModuleKey) o;
        return Objects.equals(majorName, that.majorName) && Objects.equals(moduleId, that.moduleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(majorName, moduleId);
    }

    @Override
    public String toString() {
        return "MajorModuleKey{" +
                "majorName='" + majorName + '\'' +
                ", moduleId='" + moduleId + '\'' +
                '}';
    }
}
