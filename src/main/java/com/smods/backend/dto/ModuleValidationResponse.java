package com.smods.backend.dto;

import java.util.List;
import java.util.Map;

public class ModuleValidationResponse {
    private List<String> unsatisfiedPreRequisites;
    private List<String> unsatisfiedCoRequisites;
    private List<String> mutuallyExclusiveConflicts;
    private List<PlanModuleGPADTO> planModuleGPAs;
    private Map<String, Double> progress;

    public ModuleValidationResponse(List<String> unsatisfiedPreRequisites, List<String> unsatisfiedCoRequisites, List<String> mutuallyExclusiveConflicts, List<PlanModuleGPADTO> planModuleGPAs, Map<String, Double> progress) {
        this.unsatisfiedPreRequisites = unsatisfiedPreRequisites;
        this.unsatisfiedCoRequisites = unsatisfiedCoRequisites;
        this.mutuallyExclusiveConflicts = mutuallyExclusiveConflicts;
        this.planModuleGPAs = planModuleGPAs;
        this.progress = progress;
    }

    // Getters and Setters
    public List<String> getUnsatisfiedPreRequisites() {
        return unsatisfiedPreRequisites;
    }

    public void setUnsatisfiedPreRequisites(List<String> unsatisfiedPreRequisites) {
        this.unsatisfiedPreRequisites = unsatisfiedPreRequisites;
    }

    public List<String> getUnsatisfiedCoRequisites() {
        return unsatisfiedCoRequisites;
    }

    public void setUnsatisfiedCoRequisites(List<String> unsatisfiedCoRequisites) {
        this.unsatisfiedCoRequisites = unsatisfiedCoRequisites;
    }

    public List<String> getMutuallyExclusiveConflicts() {
        return mutuallyExclusiveConflicts;
    }

    public void setMutuallyExclusiveConflicts(List<String> mutuallyExclusiveConflicts) {
        this.mutuallyExclusiveConflicts = mutuallyExclusiveConflicts;
    }

    public List<PlanModuleGPADTO> getPlanModuleGPAs() {
        return planModuleGPAs;
    }

    public void setPlanModuleGPAs(List<PlanModuleGPADTO> planModuleGPAs) {
        this.planModuleGPAs = planModuleGPAs;
    }

    public Map<String, Double> getProgress() {
        return progress;
    }

    public void setProgress(Map<String, Double> progress) {
        this.progress = progress;
    }
}
