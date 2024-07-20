package com.smods.backend.dto;

import java.util.List;
import java.util.Map;

public class ModuleValidationResponse {
    private List<String> unsatisfiedPreRequisites;
    private List<String> unsatisfiedCoRequisites;
    private List<String> mutuallyExclusiveConflicts;
    private List<PlanModuleGPADTO> planModuleGPADTOs;
    private List<String> compulsoryModules;
    private Map<String, Double> planRequirementProgress;

    public ModuleValidationResponse(List<String> unsatisfiedPreRequisites, List<String> unsatisfiedCoRequisites, List<String> mutuallyExclusiveConflicts, List<PlanModuleGPADTO> planModuleGPADTOs, List<String> compulsoryModules, Map<String, Double> planRequirementProgress) {
        this.unsatisfiedPreRequisites = unsatisfiedPreRequisites;
        this.unsatisfiedCoRequisites = unsatisfiedCoRequisites;
        this.mutuallyExclusiveConflicts = mutuallyExclusiveConflicts;
        this.planModuleGPADTOs = planModuleGPADTOs;
        this.compulsoryModules = compulsoryModules;
        this.planRequirementProgress = planRequirementProgress;
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

    public List<PlanModuleGPADTO> getPlanModuleGPADTOs() {
        return planModuleGPADTOs;
    }

    public void setPlanModuleGPADTOs(List<PlanModuleGPADTO> planModuleGPADTOs) {
        this.planModuleGPADTOs = planModuleGPADTOs;
    }

    public List<String> getCompulsoryModules() {
        return compulsoryModules;
    }

    public void setCompulsoryModules(List<String> compulsoryModules) {
        this.compulsoryModules = compulsoryModules;
    }

    public Map<String, Double> getPlanRequirementProgress() {
        return planRequirementProgress;
    }

    public void setPlanRequirementProgress(Map<String, Double> planRequirementProgress) {
        this.planRequirementProgress = planRequirementProgress;
    }
}
