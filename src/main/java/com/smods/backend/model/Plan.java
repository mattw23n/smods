package com.smods.backend.model;

import com.smods.backend.model.composite_key.PlanKey;
import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "PLAN")
public class Plan {

    @EmbeddedId
    private PlanKey planId;

    @Column(name = "PLAN_NAME")
    private String planName;

    @Column(name = "DEGREE")
    private String degree;

    @Column(name = "TRACK")
    private String track;

    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("userId")
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
    private List<PlanModuleGPA> planModuleGPAs;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
    private List<PlanModulePreassignedGPA> planModulePreassignedGPAs;

    public PlanKey getPlanId() {
        return planId;
    }

    public void setPlanId(PlanKey planId) {
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

    public String getTrack() {
        return track;
    }

    public void setTrack(String track) {
        this.track = track;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<PlanModuleGPA> getPlanModuleGPAs() {
        return planModuleGPAs;
    }

    public void setPlanModuleGPAs(List<PlanModuleGPA> planModuleGPAs) {
        this.planModuleGPAs = planModuleGPAs;
    }

    public List<PlanModulePreassignedGPA> getPlanModulePreassignedGPAs() {
        return planModulePreassignedGPAs;
    }

    public void setPlanModulePreassignedGPAs(List<PlanModulePreassignedGPA> planModulePreassignedGPAs) {
        this.planModulePreassignedGPAs = planModulePreassignedGPAs;
    }
}