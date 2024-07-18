package com.smods.backend.model;

import com.smods.backend.exception.PlanModificationException;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.smods.backend.model.composite_key.PlanKey;
import jakarta.persistence.*;

import java.time.ZonedDateTime;
import java.util.*;

@Entity
@Table(name = "PLAN")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "degree")
    private String degree;

    @Column(name = "track")
    private String track;

    @Column(name = "exemptions")
    private Set<Module> exemptions = new HashSet<>();

    @ManyToMany
    @Column(name = "plannedModules")
    private Set<Module> plannedModules = new HashSet<>();
    @EmbeddedId
    private PlanKey planId;

    @Column(name = "PLAN_NAME")
    private String planName;

    @Column(name = "DEGREE")
    private String degree;

    @Column(name = "TRACK1")
    private String track1;

    @Column(name = "TRACK2")
    private String track2;

    @Column(name = "CREATION_DATE")
    private ZonedDateTime creationDateTime;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @MapsId("userId")
    @JoinColumn(name = "USER_ID")
    @JsonBackReference(value = "user-plan")
    private User user;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "plan-planModuleGPA")
    private List<PlanModuleGPA> planModuleGPAs = new ArrayList<>();

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "plan-planModulePreassignedGPA")
    private List<PreassignedModule> planModulePreassignedGPAs = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "MAJOR")
    private Major major;

    // Default constructor
    public Plan() {
    }

    public Plan(PlanKey planId, String planName, String degree, String track1, String track2, ZonedDateTime creationDateTime) {
        this.planId = planId;
        this.planName = planName;
        this.degree = degree;
        this.track1 = track1;
        this.track2 = track2;
        this.creationDateTime = creationDateTime;
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

    public String getTrack1() {
        return track1;
    }

    public void setTrack1(String track1) {
        this.track1 = track1;
    }

    public String getTrack2() {
        return track2;
    }

    public void setTrack2(String track2) {
        this.track2 = track2;
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

    public void setPlanModulePreassignedGPAs(List<PreassignedModule> planModulePreassignedGPAs) {
        this.planModulePreassignedGPAs = planModulePreassignedGPAs;
    }

    public Major getMajor() {
        return major;
    }

    public void setMajor(Major major) {
        this.major = Plan.this.major;
    }

    // Equals and hashCode methods

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Plan plan = (Plan) o;
        return Objects.equals(planId, plan.planId) && Objects.equals(planName, plan.planName) && Objects.equals(degree, plan.degree) && Objects.equals(track1, plan.track1) && Objects.equals(track2, plan.track2) && Objects.equals(creationDateTime, plan.creationDateTime) && Objects.equals(user, plan.user) && Objects.equals(planModuleGPAs, plan.planModuleGPAs) && Objects.equals(planModulePreassignedGPAs, plan.planModulePreassignedGPAs) && Objects.equals(major, plan.major);
    }

    @Override
    public int hashCode() {
        return Objects.hash(planId, planName, degree, track1, track2, creationDateTime, user, planModuleGPAs, planModulePreassignedGPAs, major);
    }

    @Override
    public String toString() {
        return "Plan{" +
                "planId=" + planId +
                ", planName='" + planName + '\'' +
                ", degree='" + degree + '\'' +
                ", track1='" + track1 + '\'' +
                ", track2='" + track2 + '\'' +
                ", creationDateTime=" + creationDateTime +
                ", user=" + user +
                ", planModuleGPAs=" + planModuleGPAs +
                ", planModulePreassignedGPAs=" + planModulePreassignedGPAs +
                ", major=" + major +
                '}';
    }
}