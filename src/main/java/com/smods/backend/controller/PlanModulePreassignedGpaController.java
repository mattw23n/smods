package com.smods.backend.controller;

import com.smods.backend.model.PlanModulePreassignedGpa;
import com.smods.backend.service.PlanModulePreassignedGpaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plan-modules")
public class PlanModulePreassignedGpaController {
    private final PlanModulePreassignedGpaService planModulePreassignedGpaService;

    @Autowired
    public PlanModulePreassignedGpaController(PlanModulePreassignedGpaService planModulePreassignedGpaService) {
        this.planModulePreassignedGpaService = planModulePreassignedGpaService;
    }

    @GetMapping
    public List<PlanModulePreassignedGpa> getAllPlanModules() {
        return planModulePreassignedGpaService.getAllPlanModules();
    }

    @PostMapping
    public PlanModulePreassignedGpa createPlanModule(@RequestBody PlanModulePreassignedGpa planModulePreassignedGpa) {
        return planModulePreassignedGpaService.createPlanModule(planModulePreassignedGpa);
    }
}
