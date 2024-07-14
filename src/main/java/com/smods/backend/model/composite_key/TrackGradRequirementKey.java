package com.smods.backend.model.composite_key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class TrackGradRequirementKey implements Serializable {
    @Column(name = "TRACK_NAME")
    private String trackName;

    @Column(name = "TRACK_GRAD_REQUIREMENT_TYPE")
    private String trackGradRequirementType;
}
