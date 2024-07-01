package com.smods.backend.model.composite_key;

import java.io.Serializable;
import java.util.Objects;

public class MutuallyExclusiveKey implements Serializable {
    private String moduleId;
    private String moduleId2;

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getModuleId2() {
        return moduleId2;
    }

    public void setModuleId2(String moduleId2) {
        this.moduleId2 = moduleId2;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MutuallyExclusiveKey that = (MutuallyExclusiveKey) o;
        return Objects.equals(moduleId, that.moduleId) && Objects.equals(moduleId2, that.moduleId2);
    }

    @Override
    public int hashCode() {
        return Objects.hash(moduleId, moduleId2);
    }
}
