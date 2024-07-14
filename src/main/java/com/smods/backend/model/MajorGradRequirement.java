package com.smods.backend.model;

import com.smods.backend.model.composite_key.MajorGradRequirementKey;
import jakarta.persistence.*;

import java.util.HashMap;
import java.util.Map;

@Entity
public class MajorGradRequirement {
    @EmbeddedId
    private MajorGradRequirementKey majorGradRequirementId;

    @ManyToOne
    @MapsId("majorName")
    @JoinColumn(name = "MAJOR_NAME")
    private Major major;

    @ElementCollection
    @CollectionTable(name = "MAJOR_BASKET", joinColumns = {
            @JoinColumn(name = "MAJOR_NAME", referencedColumnName = "MAJOR_NAME"),
            @JoinColumn(name = "MAJOR_GRAD_REQUIREMENT_TYPE", referencedColumnName = "MAJOR_GRAD_REQUIREMENT_TYPE")
    })
    @MapKeyColumn(name = "MAJOR_BASKET")
    @Column(name = "COURSE_UNIT")
    private Map<String, Double> majorBaskets = new HashMap<>();

    public MajorGradRequirement() {
    }

    public MajorGradRequirement(MajorGradRequirementKey majorGradRequirementId, Major major) {
        this.majorGradRequirementId = majorGradRequirementId;
        this.major = major;
    }
}
