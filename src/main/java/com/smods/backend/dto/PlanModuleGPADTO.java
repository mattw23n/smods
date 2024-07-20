package com.smods.backend.dto;

public class PlanModuleGPADTO {
    private String moduleId;
    private String moduleName;
    private double gpa;
    private int term;
    private boolean isError;

    public PlanModuleGPADTO(String moduleId, String moduleName, double gpa, int term, boolean isError) {
        this.moduleId = moduleId;
        this.moduleName = moduleName;
        this.gpa = gpa;
        this.term = term;
        this.isError = isError;
    }

    // Getters and setters
    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
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

    public boolean isError() {
        return isError;
    }

    public void setError(boolean isError) {
        this.isError = isError;
    }
}