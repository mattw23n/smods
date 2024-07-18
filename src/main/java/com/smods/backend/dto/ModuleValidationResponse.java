package com.smods.backend.dto;

import java.util.List;

public class ModuleValidationResponse {
    private List<String> unsatisfiedPreRequisites;
    private List<String> unsatisfiedCoRequisites;
    private List<String> mutuallyExclusiveConflicts;

    public ModuleValidationResponse(List<String> unsatisfiedPreRequisites, List<String> unsatisfiedCoRequisites, List<String> mutuallyExclusiveConflicts) {
        this.unsatisfiedPreRequisites = unsatisfiedPreRequisites;
        this.unsatisfiedCoRequisites = unsatisfiedCoRequisites;
        this.mutuallyExclusiveConflicts = mutuallyExclusiveConflicts;
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
}