package com.smods.backend.model.composite_key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class MajorGradRequirementKey implements Serializable {
    @Column(name = "MAJOR_NAME")
    private String majorName;
    @Column(name = "MAJOR_GRAD_REQUIREMENT_TYPE")
    private String majorGradRequirementType;
}
