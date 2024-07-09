package com.smods.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.smods.backend.model.composite_key.PlanKey;
import jakarta.persistence.*;

import java.time.ZonedDateTime;
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
    @JsonBackReference(value = "user-plan")
    private User user;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "plan-planModuleGPA")
    private List<PlanModuleGPA> planModuleGPAs;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "plan-planModulePreassignedGPA")
    private List<PlanModulePreassignedGPA> planModulePreassignedGPAs;

    @Column(name = "CREATION_DATE")
    private ZonedDateTime creationDateTime;

    // Default constructor
    public Plan() {
    }

    // Constructor with parameters
    public Plan(String planName, String degree, String track, User user) {
        this.planName = planName;
        this.degree = degree;
        this.track = track;
        this.user = user;
    }

    // Getters and setters
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

    public ZonedDateTime getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(ZonedDateTime creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    // Equals and hashCode methods

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Plan plan = (Plan) o;
        return Objects.equals(planId, plan.planId) &&
                Objects.equals(planName, plan.planName) &&
                Objects.equals(degree, plan.degree) &&
                Objects.equals(track, plan.track) &&
                Objects.equals(user, plan.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(planId, planName, degree, track, user);
    }
}