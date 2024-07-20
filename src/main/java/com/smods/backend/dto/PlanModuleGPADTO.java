package com.smods.backend.dto;

public class PlanModuleGPADTO {
    private String moduleId;
    private double gpa;
    private int term;

    // Constructor, getters, and setters
    public PlanModuleGPADTO(String moduleId, double gpa, int term) {
        this.moduleId = moduleId;
        this.gpa = gpa;
        this.term = term;
    }

    // Getters and setters

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public double getGpa() {
        return gpa;
    }

    public void setGpa(double gpa) {
        this.gpa = gpa;
    }

    public int getTerm() {
        return term;
    }

    public void setTerm(int term) {
        this.term = term;
    }
}

