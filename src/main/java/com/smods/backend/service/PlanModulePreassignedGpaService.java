package com.smods.backend.service;

import com.smods.backend.model.PlanModulePreassignedGpa;
import com.smods.backend.model.PlanModuleId;
import com.smods.backend.repository.PlanModulePreassignedGpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanModulePreassignedGpaService {
    private final PlanModulePreassignedGpaRepository planModulePreassignedGpaRepository;

    @Autowired
    public PlanModulePreassignedGpaService(PlanModulePreassignedGpaRepository planModulePreassignedGpaRepository) {
        this.planModulePreassignedGpaRepository = planModulePreassignedGpaRepository;
    }

    public List<PlanModulePreassignedGpa> getAllPlanModules() {
        return planModulePreassignedGpaRepository.findAll();
    }

    public PlanModulePreassignedGpa createPlanModule(PlanModulePreassignedGpa planModulePreassignedGpa) {
        return planModulePreassignedGpaRepository.save(planModulePreassignedGpa);
    }
}
