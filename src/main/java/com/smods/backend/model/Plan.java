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

<<<<<<< HEAD
    @Column(name = "TRACK1")
    private String track1;

    @Column(name = "TRACK2")
    private String track2;
=======
    @Column(name = "TRACK")
    private String track;
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581

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

<<<<<<< HEAD
    public Plan(PlanKey planId, String planName, String degree, String track1, String track2, ZonedDateTime creationDateTime) {
        this.planId = planId;
        this.planName = planName;
        this.degree = degree;
        this.track1 = track1;
        this.track2 = track2;
        this.creationDateTime = creationDateTime;
    }

=======
    // Constructor with parameters
    public Plan(String planName, String degree, String track, User user) {
        this.planName = planName;
        this.degree = degree;
        this.track = track;
        this.user = user;
    }

    // Getters and setters
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
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

<<<<<<< HEAD
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

    public ZonedDateTime getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(ZonedDateTime creationDateTime) {
        this.creationDateTime = creationDateTime;
=======
    public String getTrack() {
        return track;
    }

    public void setTrack(String track) {
        this.track = track;
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

<<<<<<< HEAD
=======
    public ZonedDateTime getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(ZonedDateTime creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    public List<PlanModuleGPA> getPlanModuleGPAs() {
        return planModuleGPAs;
    }

    public void setPlanModuleGPAs(List<PlanModuleGPA> planModuleGPAs) {
        this.planModuleGPAs = planModuleGPAs;
    }

    public List<PreassignedModule> getPlanModulePreassignedGPAs() {
        return planModulePreassignedGPAs;
    }

<<<<<<< HEAD
    public void setPlanModulePreassignedGPAs(List<PreassignedModule> planModulePreassignedGPAs) {
        this.planModulePreassignedGPAs = planModulePreassignedGPAs;
=======
    public void setPlanModulePreassignedGPAs(List<PreassignedModule> preassignedModules) {
        this.planModulePreassignedGPAs = preassignedModules;
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    }

    public List<Major> getMajors() {
        return majors;
    }

    public void setMajors(List<Major> majors) {
        this.majors = majors;
    }

<<<<<<< HEAD
=======
    // Equals and hashCode methods

>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Plan plan = (Plan) o;
<<<<<<< HEAD
        return Objects.equals(planId, plan.planId) && Objects.equals(planName, plan.planName) && Objects.equals(degree, plan.degree) && Objects.equals(track1, plan.track1) && Objects.equals(track2, plan.track2) && Objects.equals(creationDateTime, plan.creationDateTime) && Objects.equals(user, plan.user) && Objects.equals(planModuleGPAs, plan.planModuleGPAs) && Objects.equals(planModulePreassignedGPAs, plan.planModulePreassignedGPAs) && Objects.equals(majors, plan.majors);
=======
        return Objects.equals(planId, plan.planId) && Objects.equals(planName, plan.planName) && Objects.equals(degree, plan.degree) && Objects.equals(track, plan.track) && Objects.equals(creationDateTime, plan.creationDateTime) && Objects.equals(user, plan.user) && Objects.equals(planModuleGPAs, plan.planModuleGPAs) && Objects.equals(planModulePreassignedGPAs, plan.planModulePreassignedGPAs) && Objects.equals(majors, plan.majors);
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    }

    @Override
    public int hashCode() {
<<<<<<< HEAD
        return Objects.hash(planId, planName, degree, track1, track2, creationDateTime, user, planModuleGPAs, planModulePreassignedGPAs, majors);
=======
        return Objects.hash(planId, planName, degree, track, creationDateTime, user, planModuleGPAs, planModulePreassignedGPAs, majors);
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    }

    @Override
    public String toString() {
        return "Plan{" +
                "planId=" + planId +
                ", planName='" + planName + '\'' +
                ", degree='" + degree + '\'' +
<<<<<<< HEAD
                ", track1='" + track1 + '\'' +
                ", track2='" + track2 + '\'' +
=======
                ", track='" + track + '\'' +
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
                ", creationDateTime=" + creationDateTime +
                ", user=" + user +
                ", planModuleGPAs=" + planModuleGPAs +
                ", planModulePreassignedGPAs=" + planModulePreassignedGPAs +
                ", majors=" + majors +
                '}';
    }
}