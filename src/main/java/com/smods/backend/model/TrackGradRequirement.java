package com.smods.backend.model;

import com.smods.backend.model.composite_key.TrackGradRequirementKey;
import jakarta.persistence.*;

import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "TRACK_GRAD_REQUIREMENT")
public class TrackGradRequirement {
    @EmbeddedId
    private TrackGradRequirementKey trackGradRequirementId;

    @ManyToOne
    @MapsId("trackName")
    @JoinColumn(name = "TRACK_NAME", referencedColumnName = "TRACK_NAME")
    private Track track;

    @ElementCollection
    @CollectionTable(name = "TRACK_BASKET", joinColumns = {
            @JoinColumn(name = "TRACK_NAME", referencedColumnName = "TRACK_NAME"),
            @JoinColumn(name = "TRACK_GRAD_REQUIREMENT_TYPE", referencedColumnName = "TRACK_GRAD_REQUIREMENT_TYPE")
    })
    @MapKeyColumn(name = "TRACK_BASKET")
    @Column(name = "COURSE_UNIT")
    private Map<String, Double> trackBaskets = new HashMap<>();
}
