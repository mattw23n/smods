package com.smods.backend.dto;

import com.smods.backend.model.PlanModuleGPA;
import java.time.ZonedDateTime;
import java.util.List;

public class PlanDTO {
    private Long planId;
    private String planName;
    private String degree;
    private String firstMajor;
    private String secondMajor;
    private ZonedDateTime creationDateTime;
    private List<PlanModuleGPA> planModuleGPAs;

    public PlanDTO(Long planId, String planName, String degree, String firstMajor, String secondMajor, ZonedDateTime creationDateTime, List<PlanModuleGPA> planModuleGPAs) {
        this.planId = planId;
        this.planName = planName;
        this.degree = degree;
        this.firstMajor = firstMajor;
        this.secondMajor = secondMajor;
        this.creationDateTime = creationDateTime;
        this.planModuleGPAs = planModuleGPAs;
    }

    // Getters and setters

    public Long getPlanId() {
        return planId;
    }

    public void setPlanId(Long planId) {
        this.planId = planId;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getFirstMajor() {
        return firstMajor;
    }

    public void setFirstMajor(String firstMajor) {
        this.firstMajor = firstMajor;
    }

    public String getSecondMajor() {
        return secondMajor;
    }

    public void setSecondMajor(String secondMajor) {
        this.secondMajor = secondMajor;
    }

    public ZonedDateTime getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(ZonedDateTime creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    public List<PlanModuleGPA> getPlanModuleGPAs() {
        return planModuleGPAs;
    }

    public void setPlanModuleGPAs(List<PlanModuleGPA> planModuleGPAs) {
        this.planModuleGPAs = planModuleGPAs;
    }
}
