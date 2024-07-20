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
    private PlanKey planKey;

    @Column(name = "PLAN_NAME")
    private String planName;

    @Column(name = "CREATION_DATE")
    private ZonedDateTime creationDateTime;


    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "USER_ID")
    @JsonBackReference(value = "user-plan")
    private User user;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "plan-planModuleGPA")
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

    public Plan(PlanKey planKey, String planName, ZonedDateTime creationDateTime, User user, Degree degree, Major firstMajor, Major secondMajor) {
        this.planKey = planKey;
        this.planName = planName;
        this.creationDateTime = creationDateTime;
        this.user = user;
        this.degree = degree;
        this.firstMajor = firstMajor;
        this.secondMajor = secondMajor;
    }

    public Plan(PlanKey planKey) {
        this.planKey = planKey;
    }

    public PlanKey getPlanKey() {
        return planKey;
    }

    public void setPlanKey(PlanKey planKey) {
        this.planKey = planKey;
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
        return Objects.equals(planKey, plan.planKey) && Objects.equals(planName, plan.planName) && Objects.equals(creationDateTime, plan.creationDateTime) && Objects.equals(user, plan.user) && Objects.equals(planModuleGPAs, plan.planModuleGPAs) && Objects.equals(degree, plan.degree) && Objects.equals(firstMajor, plan.firstMajor) && Objects.equals(secondMajor, plan.secondMajor);
    }

    @Override
    public int hashCode() {
        return Objects.hash(planKey, planName, creationDateTime, user, planModuleGPAs, degree, firstMajor, secondMajor);
    }

    @Override
    public String toString() {
        return "Plan{" +
                "planKey=" + planKey +
                ", planName='" + planName + '\'' +
                ", creationDateTime=" + creationDateTime +
                '}';
    }
}