package com.smods.backend.model;

import com.smods.backend.model.composite_key.PreRequisiteKey;
import jakarta.persistence.*;

@Entity
@Table(name = "PRE_REQUISITE")
@IdClass(PreRequisiteKey.class)
public class PreRequisite {

    @Id
    @Column(name = "MODULE_ID")
    private String moduleId;

    @Id
    @Column(name = "MODULE_ID2")
    private String moduleId2;

    // Getters and Setters

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
