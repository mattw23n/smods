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

    @Column(name = "CREATION_DATE")
    private ZonedDateTime creationDateTime;

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
    private List<PreassignedModule> planModulePreassignedGPAs;

    @ManyToMany
    @JoinTable(
            name = "PLAN_MAJOR",
            joinColumns = {
                    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID"),
                    @JoinColumn(name = "PLAN_ID", referencedColumnName = "PLAN_ID")
            },
            inverseJoinColumns = @JoinColumn(name = "MAJOR_NAME")
    )
    private List<Major> majors;

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

    public List<PreassignedModule> getPlanModulePreassignedGPAs() {
        return planModulePreassignedGPAs;
    }

    public void setPlanModulePreassignedGPAs(List<PreassignedModule> preassignedModules) {
        this.planModulePreassignedGPAs = preassignedModules;
    }

    public List<Major> getMajors() {
        return majors;
    }

    public void setMajors(List<Major> majors) {
        this.majors = majors;
    }

    // Equals and hashCode methods

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Plan plan = (Plan) o;
        return Objects.equals(planId, plan.planId) && Objects.equals(planName, plan.planName) && Objects.equals(degree, plan.degree) && Objects.equals(track, plan.track) && Objects.equals(creationDateTime, plan.creationDateTime) && Objects.equals(user, plan.user) && Objects.equals(planModuleGPAs, plan.planModuleGPAs) && Objects.equals(planModulePreassignedGPAs, plan.planModulePreassignedGPAs) && Objects.equals(majors, plan.majors);
    }

    @Override
    public int hashCode() {
        return Objects.hash(planId, planName, degree, track, creationDateTime, user, planModuleGPAs, planModulePreassignedGPAs, majors);
    }

    @Override
    public String toString() {
        return "Plan{" +
                "planId=" + planId +
                ", planName='" + planName + '\'' +
                ", degree='" + degree + '\'' +
                ", track='" + track + '\'' +
                ", creationDateTime=" + creationDateTime +
                ", user=" + user +
                ", planModuleGPAs=" + planModuleGPAs +
                ", planModulePreassignedGPAs=" + planModulePreassignedGPAs +
                ", majors=" + majors +
                '}';
    }
}