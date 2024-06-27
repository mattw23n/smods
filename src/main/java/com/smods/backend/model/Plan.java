package com.smods.backend.model;

import com.smods.backend.model.composite_key.PlanModulePreassignedGpaKey;
import com.smods.backend.exception.PlanModificationException;
import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "PLAN")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PID")
    private Long id;

    @Column(name = "PNAME")
    private String pname;

    @Column(name = "DEGREE")
    private String degree;

    @Column(name = "TRACK")
    private String track;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "UID")
    private User user;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
    private List<PlanModuleGpa> planModuleGPAs;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
    private List<PlanModulePreassignedGpa> planModulePreassignedGPAs;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
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

    public List<PlanModuleGpa> getPlanModuleGPAs() {
        return planModuleGPAs;
    }

    public void setPlanModuleGPAs(List<PlanModuleGpa> planModuleGPAs) {
        this.planModuleGPAs = planModuleGPAs;
    }

    public List<PlanModulePreassignedGpa> getPlanModulePreassignedGPAs() {
        return planModulePreassignedGPAs;
    }

    public void setPlanModulePreassignedGPAs(List<PlanModulePreassignedGpa> planModulePreassignedGPAs) {
        this.planModulePreassignedGPAs = planModulePreassignedGPAs;
    }
}