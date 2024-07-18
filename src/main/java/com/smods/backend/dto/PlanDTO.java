package com.smods.backend.dto;

import java.time.ZonedDateTime;

public class PlanDTO {
    private Long planId;
    private String planName;
    private String degree;
    private String track1;
    private String track2;
    private ZonedDateTime creationDateTime;

    public PlanDTO(Long planId, String planName, String degree, String track1, String track2, ZonedDateTime creationDateTime) {
        this.planId = planId;
        this.planName = planName;
        this.degree = degree;
        this.track1 = track1;
        this.track2 = track2;
        this.creationDateTime = creationDateTime;
    }

    // Getters
    public Long getPlanId() {
        return planId;
    }

    public String getPlanName() {
        return planName;
    }

    public String getDegree() {
        return degree;
    }

    public String getTrack1() {
        return track1;
    }

    public String getTrack2() {
        return track2;
    }

    public ZonedDateTime getCreationDateTime() {
        return creationDateTime;
    }
}
