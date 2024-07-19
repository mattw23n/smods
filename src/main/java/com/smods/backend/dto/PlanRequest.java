package com.smods.backend.dto;

public class PlanRequest {
    private String planName;
    private String degreeName;
    private String firstMajorName;
    private String secondMajorName;

    // Getters and setters
    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getDegreeName() {
        return degreeName;
    }

    public void setDegreeName(String degreeName) {
        this.degreeName = degreeName;
    }

    public String getFirstMajorName() {
        return firstMajorName;
    }

    public void setFirstMajorName(String firstMajorName) {
        this.firstMajorName = firstMajorName;
    }

    public String getSecondMajorName() {
        return secondMajorName;
    }

    public void setSecondMajorName(String secondMajorName) {
        this.secondMajorName = secondMajorName;
    }
}
