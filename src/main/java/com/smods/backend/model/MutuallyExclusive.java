package com.smods.backend.model;

import com.smods.backend.model.composite_key.MutuallyExclusiveKey;
import jakarta.persistence.*;

@Entity
@Table(name = "MUTUALLY_EXCLUSIVE")
@IdClass(MutuallyExclusiveKey.class)
public class MutuallyExclusive {

    @Id
    @Column(name = "MODULE_ID")
    private String moduleId;

    @Id
    @Column(name = "MODULE_ID2")
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
}