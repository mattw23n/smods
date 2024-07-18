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

    @Column(name = "CREATION_DATE")
    private ZonedDateTime creationDateTime;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
    private List<PlanModuleGPA> planModuleGPAs;

    @ManyToOne
    @JoinColumn(name = "DEGREE_NAME")
    private Degree degree;

    @ManyToOne
    @JoinColumn(name = "FIRST_MAJOR")
    private Major firstMajor;

    @ManyToOne
    @JoinColumn(name = "SECOND_MAJOR")
    private Major secondMajor;

    public Plan() {
    }

    public Plan(PlanKey planId, String planName, ZonedDateTime creationDateTime) {
        this.planId = planId;
        this.planName = planName;
        this.creationDateTime = creationDateTime;
    }

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

    public ZonedDateTime getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(ZonedDateTime creationDateTime) {
        this.creationDateTime = creationDateTime;
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

    public Degree getDegree() {
        return degree;
    }

    public void setDegree(Degree degree) {
        this.degree = degree;
    }

    public Major getFirstMajor() {
        return firstMajor;
    }

    public void setFirstMajor(Major firstMajor) {
        this.firstMajor = firstMajor;
    }

    public Major getSecondMajor() {
        return secondMajor;
    }

    public void setSecondMajor(Major secondMajor) {
        this.secondMajor = secondMajor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Plan plan = (Plan) o;
        return Objects.equals(planId, plan.planId) && Objects.equals(planName, plan.planName) && Objects.equals(creationDateTime, plan.creationDateTime) && Objects.equals(user, plan.user) && Objects.equals(planModuleGPAs, plan.planModuleGPAs) && Objects.equals(degree, plan.degree) && Objects.equals(firstMajor, plan.firstMajor) && Objects.equals(secondMajor, plan.secondMajor);
    }

    @Override
    public int hashCode() {
        return Objects.hash(planId, planName, creationDateTime, user, planModuleGPAs, degree, firstMajor, secondMajor);
    }

    @Override
    public String toString() {
        return "Plan{" +
                "planId=" + planId +
                ", planName='" + planName + '\'' +
                ", creationDateTime=" + creationDateTime +
                ", user=" + user +
                ", planModuleGPAs=" + planModuleGPAs +
                ", degree=" + degree +
                ", firstMajor=" + firstMajor +
                ", secondMajor=" + secondMajor +
                '}';
    }
}